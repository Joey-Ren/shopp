const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const {connect,initSchemas} = require('./database/init.js')

//使用async await new Promise的时候必须resolve(),否则代码不会往下走
;(async()=>{
   await connect()
   initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'ja5k',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
   
   
})()
app.use(async(ctx)=>{
    ctx.body = 'hooljfdjos'
})
app.listen(3000,()=>{
        console.log('node应用启动成功')
})