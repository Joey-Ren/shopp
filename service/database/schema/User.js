const mongoose = require('mongoose') //引入mongoose
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema  //声明schema
let ObjectId = Schema.Types.ObjectId
const SALT_WORK_FACTOR = 10
//创建我们的用户Schema
//在程序中定义的是user而真实数据库中变成了users ,其实只要在Schema里配置一下就可以解决这个问题,打开servcie/database/schema/User.js修改new的时候的代码。加入
const UserSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}

},{collection:'user'})
// 使用bcrypt这个库进行加盐加密
UserSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err)return next(err)
        bcrypt.hash(this.password,salt,(err,newHash)=>{
            if(err)return next(err)
            this.password = newHash
            next()
        })
    })

})
UserSchema.methods ={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err){
                    resolve(isMatch)
                }else{
                    reject(err)
                }
            })
        })
    }
}

//发布模型


mongoose.model('User',UserSchema)
