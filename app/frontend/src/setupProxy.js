const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000/coudo',
      changeOrigin: true,
    })
  );
  app.use(
    '/detect',
    createProxyMiddleware({
      target: 'http://localhost:8501',
      changeOrigin: true,
    })
  );
};