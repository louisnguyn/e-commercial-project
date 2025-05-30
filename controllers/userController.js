import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/userModel.js';

export async function renderLoginPage(req, res, next) {
    try {
        res.render('userManagement/login.ejs', {
            title: 'Login',
        });
    } catch (error) {
        next(error);
    }
}

export async function renderRegisterPage(req, res, next) {
    try {
        res.render('userManagement/register.ejs', {
        title: 'Register',
        });
    } catch (error) {
        next(error);
    }
}

export async function registerUser(req,res, next)
{
    try{
        const {fullName, email,password,confirmedPassword, securityQuestion, securityAnswer, phoneNumber} = req.body;
        if (password != confirmedPassword)
        {
            return res.status(400).send("Passwords do not match");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const hashedAnswer = await bcrypt.hash(securityAnswer,10);
        await createUser({ fullName, email, phoneNumber, hashedPassword, securityQuestion, hashedAnswer });
        res.redirect('/login');
    } catch (error){
        next(error);
    }
}

export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email)

        if (user.length === 0) {
            return res.status(400).send('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        req.session.user = {
            id: user[0].id,
            fullname: user[0].fullname,
            email: user[0].email,
        };
        console.log(req.session.user);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}