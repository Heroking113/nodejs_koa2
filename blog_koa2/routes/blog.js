const router = require('koa-router')()
//实现五个接口
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//前缀：users的公共路由
router.prefix('/api/blog')

//分级路由
//获取博客列表
router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keywaord || ''

    if(ctx.query.isAdmin){
        //管理员界面 
        if(ctx.session.username == null){
            console.error("is admin, but not login")
            ctx.body = new ErrorModel('未登录')
            return
        }
    }

    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

//获取博客详情
router.get('/detail', async function(ctx, next){ 
    const detailData = await getDetail(ctx.query.id)
    return ctx.body = new SuccessModel(detailData)
})

//新建博客
router.post('/new', loginCheck, async function(ctx, next){
    const body = ctx.request.body
    body.author = ctx.session.username
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})

//更新博客
router.post('/update', loginCheck, async function(ctx, next){
    const val = await updateBlog(ctx.request.body)
    if(val){
        ctx.body = new SuccessModel()
    }else{
        ctx.body = new ErrorModel("更新博客失败！")
    }
})

//删除博客
router.post('/delete', loginCheck, async function(ctx, next){
    const thisId = ctx.request.body.id
    const author = ctx.session.username
    const val = await delBlog(thisId, author)
    if(val){
        ctx.body = new SuccessModel()
    }else{
        ctx.body = new ErrorModel("删除博客失败！")
    }
})

module.exports = router
