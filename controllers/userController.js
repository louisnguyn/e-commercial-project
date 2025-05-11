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