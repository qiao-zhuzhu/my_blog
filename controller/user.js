const moment = require('moment')

//导入 db/index.js 的数据库模块
const conn = require('../db/index.js')

//展示注册页面
const showRegisterPage = (req, res) => {
    //注意：当在调用 模板引擎的res.render 函数的时候，./相对路径 app.set（'views'）指定的目录，来进行查找的
    res.render('./user/register.ejs', {})
}

//展示登录页面
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}

//注册新用户的请求处理函数
const reg = (req, res) => {
    /*
    1.接收前端发送的 post 请求信息
    2.对前端发送的 参数进行解析
    3.对参数进行校验，合法性 是否重复
    4.往数据库添加用户名
    */
    //完成用户注册也业务逻辑
    let body = req.body

    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的表单数据后在注册用户!', status: 50 })
    }

    //查询用户名是否重复
    const sql1 = 'select count(*) as count from blog_user where username=?'

    console.log(body.username);

    conn.query(sql1, body.username, (err, result) => {
        if (err) {
            return res.send({ msg: '用户名查重失败!', status: 502 })
        }

        if (result[0].count !== 0) {
            return res.send({ msg: '请更换其他用户名后重新注册!', status: 503 })
        }

        //执行注册的业务逻辑
        body.ctime = moment().format('YY-MM-DD HH:mm:ss');

        const sql2 = 'insert into blog_user set ?'

        conn.query(sql2, body, (err, result) => {
            if (err) {
                return res.send({ msg: '注册新用户成功!', status: 504 })
            }

            if (result.affectedRows !== 1) {
                return res.send({ msg: '注册新用户失败!', status: 505 })
            }

            res.send({ msg: '注册新用户成功!', status: 200 })
        })

    })
}

//登录的请求处理函数
const login = (req, res) => {
    //1.获取到表单的数据
    const body = req.body
        //2.执行sql语句，查询用户名是否存在
    const sql1 = 'select * from blog_user where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        //如果查询期间，执行sql语句失败，则认为登录失败！
        if (err) return res.send({ msg: '用户登录失败', status: 501 })
            //如果查询的结果，记录条数不为1，则证明查询失败
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 502 })

        //把用户登录成功之后的用户信息 挂载到 session 上
        req.session.user = result[0]
            //把用户登录成功之后的结果 挂载到 session 上
        req.session.islogin = true

        //查询成功
        res.send({ msg: 'ok', status: 200 })
    })
}

//注销
const logout = (req, res) => {
    req.session.destroy(function() {
        //使用 res.redirect方法 可以让客户端重新访问 指定的页面
        res.redirect('/')
    })
}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login,
    logout
}