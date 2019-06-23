const moment = require('moment')

//导入数据库模块
const conn = require('../db/index.js')


//展示注册页面
const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {})
}

// 展示登录页面
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}

// 注册新用户的请求处理函数
const reg = (req, res) => {
    //TODO：完成用户注册的业务逻辑
    const body = req.body

    // 判断用户输入的数据是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的表单数据后在注册用户', status: 501 })
    }

    // 判断用户名是否重复
    const sql1 = 'select count(*)as count from blog_user where username=?'

    conn.query(sql1, body.username, (err, result) => {
        //如果查询失败 则告知失败
        if (err) return res.send({ msg: '用户名查重失败', status: 502 })
        console.log(result)

        if (result[0].count !== 0) return res.send({ msg: '请更换其他用户名称重新注册', status: 503 })

        //执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into blog_user set ?'
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册新用户失败', status: 504 })

            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
            res.send({ msg: '注册新用户成功！', status: 200 })
        })

    })

}

// 登陆的请求处理函数
const login = (req, res) => {
    //获取表单数据
    const body = req.body
        // console.log(body)
        //执行sql语句 查询用户是否存在
    const sql1 = 'select * from blog_user where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        //如果sql语句查询失败 则登录失败
        if (err) return res.send({ msg: '用户登录失败', status: 501 })
            //如果查询结果 记录条数不为1 则登录失败
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 502 })
            //查询成功
        res.send({ msg: 'ok', status: 200 })
    })
}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login
}