// router/index.js 路由模块
const express = require('express')
const router = express.Router()


//导入自己的业务处理模块
const ctrl = require('../controller/index.js')


// 用户请求的项目首页
router.get('/', ctrl.showIndexPage)

// 暴露router
module.exports = router