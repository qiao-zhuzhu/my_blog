//展示首页页面
const showIndexPage = (req, res) => {
    console.log(req.session)
        //使用render 函数之前，一定要保证安装和配置了ejs 模板引擎
    res.render('index.ejs', {
        user: req.session.user,
        islogin: req.session.islogin
    })

}

module.exports = {
    showIndexPage
}