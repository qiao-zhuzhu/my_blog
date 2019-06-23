// router/user.js 路由模块
const express = require('express')
const router = express.Router()


//导入用户相关的处理函数模块
const ctrl = require('../controller/user.js')


//注册
router.get('/register', ctrl.showRegisterPage)


//登录
router.get('/login', ctrl.showLoginPage)


//注册新用户
router.post('/register', ctrl.reg)


//监听登陆的请求
router.post('/login', ctrl.login)

module.exports = router