//展示首页页面
const showIndexPage = (req, res) => {
    res.render('index', { name: 'zs', age: 22 })
}

module.exports = {
    showIndexPage
}