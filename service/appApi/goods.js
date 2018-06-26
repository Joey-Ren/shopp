const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile(path.resolve(__dirname,'../','data_json/newGoods.json'), 'utf8', (err, data) => {
        let newdata = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        newdata.map((val,index)=>{
            let newGoods = new Goods(val)
            newGoods.save().then(()=>{
                saveCount++;
                console.log(`成功${saveCount}`);
                

            }).catch((err)=>{
                console.log(`失败${err}`);
                
            })
        })

      
       
    })

    ctx.body = '开始导入数据'
})
router.get('/insertAllCaterogy',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let count = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((val,index)=>{
            let newcat = new Category(val)
            newcat.save().then(()=>{
                count++
                console.log(`成功${count}`);
                
            }).catch((err)=>{
                console.log(`失败${err}`);
                
            })

        })
    })
    ctx.body = `开始插入数据`
})
module.exports = router