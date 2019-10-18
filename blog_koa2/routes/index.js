const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  //render：渲染模板，模板在views的index.pug里面
  //ctx：相当于express里面的req和res
  //ctx. ...：返回给前端的数据
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  //返回给前端的数据
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
