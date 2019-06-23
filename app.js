const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')

//注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

//把node.modules 文件夹 托管为静态资源目录
app.use('/node_modules', express.static('node_modules'))

// 用户请求的项目首页
app.get('/', (req, res) => {
    res.render('index', { name: 'zs', age: 22 })
})

//注册
app.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})


//登录
app.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})


//注册新用户
app.post('/register', (req, res) => {
    //TODO：完成用户注册的业务逻辑
    const body = req.body

    console.log(body);

    res.send({ msg: 'ok', status: 200 })
})


app.listen(3000, () => {
    console.log("服务器运行成功……")
})