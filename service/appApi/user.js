const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()
router.get('/', async (ctx) => {
    console.log(ctx.request.query);
    ctx.body = '这是user首页'

})
router.post('/register', async (ctx) => {
    console.log(ctx.request.body);
    //取得model
    let User = mongoose.model('User')
    //把从前端接收的post数据封装成一个新的User对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then((res) => {
        console.log(res);

        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    }).catch((error) => {
        //失败返回code=500,并返回错误信息
        ctx.body = {
            code: 500,
            msg: error
        }
    })

})
/*登录的实践 */
router.post('/login', async (ctx) => {
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({userName: userName}).exec().then(async (result) => {
        if (result) {
            //当用户名存在时，开始比对密码
            let newUser = new User() //因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePassword(password, result.password)
                .then((isMatch) => {
                    //返回比对结果
                    ctx.body = {
                        code: 200,
                        message: isMatch,
                        data:result
                    }
                })
                .catch(error => {
                    //出现异常，返回异常
                    console.log(error,'error login')
                    ctx.body = {
                        code: 200,
                        message: error
                    }
                })
        } else {
            ctx.body = {
                code: 200,
                message: '用户名不存在'
            }
        }

    }).catch(error => {
        ctx.body = {
            code: 500,
            message: '用户名不存在'
        }
    })
})
module.exports = router