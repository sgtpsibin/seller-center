import express from "express";
import next from "next";
import { routes } from "./routes";
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);
// const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
//   app.render(req, res, route.page, query)
// })

const devProxy = {
  "/api": {
    target: "https://api.thitruongsi.com/",
    pathRewrite: { "^/api": "/" },
    changeOrigin: true
  }
};

app.prepare().then(() => {
  const server = express();
  // server.use(handle);
  if (dev && devProxy) {
    const proxyMiddleware = require("http-proxy-middleware");
    Object.keys(devProxy).forEach(function(context) {
      server.use(proxyMiddleware(context, devProxy[context]));
    });
  }

  // server.get('/orders/:id',(req,res)=>{
  //   app.render(req,res,'/orders/[oid]',{id: req.params.id})
  // });
  server.use(handler).listen(port, (err: any) => {
    if (err) throw err;
    console.log(">Ready on " + port);
  });

  // server.all('*', (req, res) => {
  //   return handle(req, res)
  // });

  // server.listen(port, err => {
  //   if (err) throw err;
  //   console.log(`> Ready on http://localhost:${port}`)
  // })
});
