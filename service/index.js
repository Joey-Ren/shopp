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
const good = require('./appApi/goods.js')
const router = new Router()
app.use(bodyParser())
app.use(cors({
    origin: function(ctx) {
        // const regexp = new RegExp('/CORS');
        // const regexpWith = new RegExp('/CORSWith');
        // console.log(ctx.host ,'ctx.url');
        // if(ctx.host){
        //     return `http://${ctx.host}`;
        // }
        return '*'
        // if (regexpWith.test(ctx.url)) {
        //     return `http://${ctx.host}`;
        // } else if(regexp.test(ctx.url)) {
        //     return '*'
        // } else if(~String(ctx.url).indexOf('/imgs/')) {
        //     return `http://${ctx.host}`;
        //     // return '*'
        // }
        // return false;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
//使用async await new Promise的时候必须resolve(),否则代码不会往下走
;(async()=>{
   await connect()
  await initSchemas()
})()
router.use('/user', user.routes())
router.use('/good',good.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


app.use( async (ctx) => {
    ctx.body = '首页'

})



app.listen(3000, () => {
    console.log('node应用启动成功')
})