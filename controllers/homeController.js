export function renderHomePage(req,res,next)
{
    try{
        res.render('home/home.ejs', {
            title: 'Home',
        });
    } catch (error) {
        next(error);
    }
}