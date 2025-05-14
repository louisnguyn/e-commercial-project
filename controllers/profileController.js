export async function renderProfilePage(req, res, next) {
    try {
        res.render('profile/profile.ejs', {
            title: 'Profile',
        });
    } catch (error) {
        next(error);
    }
}

export async function renderEditProfilePage(req,res,next){
    try {
        res.render('profile/editProfile.ejs', {
            title: 'Edit Profile',
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