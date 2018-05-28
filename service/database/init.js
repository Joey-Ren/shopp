const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/simle-db'
mongoose.Promise = global.Promise
// 链接数据库前提是数据库启动了   cmd  mongod --dbpath 存放数据库的文件夹路径(可以直接把文件拖到cmd命令行处)


const connect = () => {
    console.log('mongodb')
    //记录链接数据库出错次数
    let maxTimes = 0
    //链接数据库
    mongoose.connect(db)
    return new Promise((resolve, reject) => {
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected', () => {
            if (maxTimes < 3) {
                maxTimes++;
                //进行重连
                mongoose.connect(db)
            } else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，需要人为修理')

            }

        })
        //数据库出现错误的时候
        mongoose.connection.on('error', err => {
            if (maxTimes < 3) {
                console.log('mongoodb启动失败')
                maxTimes++;
                //进行重连
                mongoose.connect(db)
            } else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，需要人为修理')
            }

        })
        //链接打开的时候
        mongoose.connection.once('open', () => {

            console.log('mongoodb启动成功')
        })
    })

}
module.exports = {
    connect
}