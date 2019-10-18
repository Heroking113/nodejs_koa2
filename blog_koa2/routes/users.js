const router = require('koa-router')()

//前缀：users的公共路由
router.prefix('/users')

//分级路由
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
