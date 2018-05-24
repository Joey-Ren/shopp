const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/simle-db'
mongoose.Promise = global.Promise
// 链接数据库前提是数据库启动了   cmd  mongod --dbpath 存放数据库的文件夹路径(可以直接把文件拖到cmd命令行处)
const connect =  ()=>{
    console.log('mongodb')
        mongoose.connect(db)
        mongoose.connection.on('error',err=>{
            console.log('mongoodb启动失败')
            mongoose.connect(db)
        })
        mongoose.connection.once('open',()=>{

            console.log('mongoodb启动成功')
        })
}
module.exports = {
    connect
}
