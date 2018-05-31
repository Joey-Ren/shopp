const mongoose = require('mongoose') //引入mongoose
const Schema = mongoose.Schema  //声明schema
let ObjectId = Schema.Types.ObjectId

//创建我们的用户Schema

const UserSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    passworld:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}

})

//发布模型

mongoose.model('User',UserSchema)
