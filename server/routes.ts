const routes = module.exports = require('next-routes')()
 
routes
.add('orders','/orders','/orders/index')
.add('draft_orders','/draft_orders','/orders/draft_orders')
.add('order', '/orders/:id','/orders/[oid]')
.add('newOrder','/draft_orders/:oid','/orders/newOrder')
export default routes