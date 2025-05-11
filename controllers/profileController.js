export async function renderProfilePage(req, res, next) {
    try {
        res.render('profile/profile.ejs', {
        title: 'Profile',
        });
    } catch (error) {
        next(error);
    }
}