import bcrypt from 'bcrypt';
import sql from '../config/db.js';

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
        currentPage: 'register',
        });
    } catch (error) {
        next(error);
    }
}

export async function registerUser(req,res, next)
{
    try{
        const {fullName, email,password,confirmedPassword, securityQuestion, securityAnswer} = req.body;
        if (password != confirmedPassword)
        {
            return res.status(400).send("Passwords do not match");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const hashedAnswer = await bcrypt.hash(securityAnswer,10);
        await sql`
            INSERT INTO users (fullname,email,password,securityquestion,securityanswer)
            VALUES (${fullName}, ${email}, ${hashedPassword}, ${securityQuestion}, ${hashedAnswer})
        `;
    } catch (error){
        next(error);
    }
}

export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

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

        res.redirect('/');
    } catch (error) {
        next(error);
    }
}
export function logoutUser(req, res) {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/login');
    });
}