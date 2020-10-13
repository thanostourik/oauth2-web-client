const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    if (process.env.NODE_ENV === 'development' && !process.env.FULLSTACK) {
        if ( process.env.PROXY === 'local' ) {
            setTimeout(() => { // Timeout so that Create React App doesn't clear the message
                console.log('🐻  💻  Local proxy detected, proxying to localhost:8080');
            }, 500);
            app.use(
                createProxyMiddleware(['/api', '/oauth'], {
                    target: 'http://localhost:8080',
                    changeOrigin: true
                })
            );
        }
        else {
            setTimeout(() => { // Timeout so that Create React App doesn't clear the message
                console.log('🖥  💻  No proxy detected, continue without proxy!');
            }, 500);
        }
    }
};
