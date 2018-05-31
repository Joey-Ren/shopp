const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const {connect,initSchemas} = require('./database/init.js')

;(async()=>{
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'ja5',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
   await connect()
   
   
})()
app.use(async(ctx)=>{
    ctx.body = 'hooljfdjos'
})
app.listen(3000,()=>{
        console.log('node应用启动成功')
})