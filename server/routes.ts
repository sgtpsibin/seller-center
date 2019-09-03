// const routes = module.exports = require('next-routes')()

import nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes();
export const Router = routes.Router;
export const Link = routes.Link;
 
routes
//Orders
.add('orders','/orders','/orders/index')
.add('draft_orders','/draft_orders','/orders/draft_orders')
.add('order', '/orders/:id','/orders/[oid]')
.add('newOrder','/draft_orders/:oid','/orders/newOrder')
// Products
.add('products','/products','/products/index')
.add('inventory','/inventory','/products/inventory');