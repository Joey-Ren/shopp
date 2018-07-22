const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
//读取json文件存入数据库
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
//读取json文件存入数据库
router.get('/insertAllCaterogy',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let count = 0
        const Category = mongoose.model('CategorySub')
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
//读取json文件存入数据库
router.get('/insertAllCaterogySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((val,index)=>{
            let newCategorySub = new CategorySub(val)
            newCategorySub.save().then(()=>{
                saveCount++;
                console.log('成功插入'+saveCount)
                
            }).catch(err=>{
                console.log('插入失败:'+error)
            })

        })

    })
    ctx.body = `开始插入数据/insertAllCaterogySub`
})
// 根据商品id获取详情
router.post('/getDetailGoodsInfo',async(ctx)=>{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID:goodsId}).exec()
    .then(async(result)=>{
        ctx.body = {code:200,message:result}

    }).catch(err=>{
        ctx.body = {code:500,message:err}
    })
})
// 读取大类别的API制作
router.get('/getCategoryList',async(ctx)=>{
    try{
       const Category = mongoose.model('Category') 
       let result = await Category.find().exec()
       ctx.body = {code:200,message:result}
    }catch(err){
        ctx.body = {code:500,message:err}
    }
})
// 读取小类别的API制作
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let categoryId = ctx.request.body.categoryId
        console.log(categoryId,'categoryId');
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body = {code:200,message:result}

    }catch(err){
        ctx.body = {code:500,message:err}
    }
})
//根据商品类别获取商品列表
router.get('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        //let categorySubId = ctx.request.body.categoryId
        let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
 
})
module.exports = router