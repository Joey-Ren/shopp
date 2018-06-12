const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()
router.get('/',async(ctx)=>{
    console.log(ctx.request.query);    
    ctx.body = '这是user首页'

})
router.post('/register',async(ctx)=>{
    console.log(ctx.request.body);
    //取得model
    let User = mongoose.model('User')
    //把从前端接收的post数据封装成一个新的User对象
    let newUser = new User(ctx.request.body)
   //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
   await newUser.save().then((res)=>{
       console.log(res);
       
       ctx.body = {
           code:200,
           msg:'注册成功'
       }
   }).catch((error)=>{
       //失败返回code=500,并返回错误信息
       ctx.body ={
           code:500,
           msg:error
       }
   })
})
module.exports = router