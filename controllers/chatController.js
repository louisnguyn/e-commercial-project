export function renderChatPage(req,res,next)
{
    try{
        res.render('chat/chat.ejs', {
            title: 'Chat',
        });
    } catch (error) {
        next(error);
    }
}