module.exports = {
    devServer: {
        https: true,
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000", //设置调用的接口域名和端口
                changeOrigin: true,
                pathRewrite: {
                "^/api": "" //用'/api' 代替 'http://127.0.0.1:8000'
                }
            } 
        }
    },
};