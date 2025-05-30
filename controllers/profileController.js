import bcrypt from 'bcrypt';
import { getUserById, getUserPasswordById, checkExistingEmail, updateUserProfile, updateUserPassword } from '../models/userModel.js';
import { getUserProductReviews, getAverageRatingBySellerId } from '../models/reviewModel.js';

export async function renderProfilePage(req, res, next) {
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.redirect('/login');
        const [user] = await getUserById(userId);
        res.render('profile/profile.ejs', {
            title: 'Profile',
            user
        });
    } catch (error) {
        next(error);
    }
}

export async function renderEditProfilePage(req,res,next){
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.redirect('/login');
        const [user] = await getUserById(userId);
        res.render('profile/editProfile.ejs', {
            title: 'Edit Profile',
            user
        });
    } catch (error) {
        next(error);
    }
}

export async function renderChangPasswordPage(req,res,next){
    try {
        res.render('profile/changePassword.ejs', {
            title: 'Change Password',
        });
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

export async function updateProfile(req, res, next) {
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.redirect('/login');

        const { fullName, email, phoneNumber } = req.body;
        const [existingUser] = await checkExistingEmail(email, userId);
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }

        await updateUserProfile({ userId, fullName, email, phoneNumber });
        req.session.user.fullname = fullName;
        req.session.user.email = email;
        res.redirect('/profile');
    } catch (error) {
        next(error);
    }
}

export async function changePassword(req, res, next) {
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.redirect('/login');

        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).send('New passwords do not match');
        }
        const [user] = await getUserPasswordById(userId);
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(400).send('Current password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserPassword({ userId, hashedPassword });
        res.redirect('/profile');
    } catch (error) {
        next(error);
    }
}

export async function renderUserRatingPage(req, res, next) {
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.redirect('/login');

        const reviews = await getUserProductReviews(userId);
        const avgData = await getAverageRatingBySellerId(userId);

        res.render('profile/userRating.ejs', {
            title: 'My Ratings',
            reviews,
            avgRating: avgData[0]?.avg_rating,
            totalReviews: avgData[0]?.total_reviews
        });
    } catch (error) {
        next(error);
    }
}