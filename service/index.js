const Koa = require('koa')
const app = new Koa()
const {connect} = require('./database/init.js')


;(async()=>{
   await connect()
})()
app.use(async(ctx)=>{
    ctx.body = 'hooljfdjos'
})
app.listen(3000,()=>{
        console.log('node应用启动成功')
})