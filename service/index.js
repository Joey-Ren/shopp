const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const cors = require('koa2-cors')
const {
    connect,
    initSchemas
} = require('./database/init.js')
const user = require('./appApi/user.js')
const router = new Router()
app.use(bodyParser())
app.use(cors())
//使用async await new Promise的时候必须resolve(),否则代码不会往下走
// ;(async()=>{
//    await connect()
//    initSchemas()
//     const User = mongoose.model('User')
//     let oneUser = new User({userName:'ja5k12',passworld:'123456'})
//     oneUser.save().then(()=>{
//         console.log('插入成功')
//     })


// })()
router.use('/user', user.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


app.use( async (ctx) => {
    ctx.body = '首页'

})



app.listen(3000, () => {
    console.log('node应用启动成功')
})