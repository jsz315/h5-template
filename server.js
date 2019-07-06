const express = require('express');
const proxy = require('express-http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
const opn = require('opn');
const http = require('./config/http');
const mock = require('./mock')

var proxyTable = {
	'/kjy': {
		target: http.server,
		changeOrigin: true,
		pathRewrite: {
			// 重写请求，比如我们源访问的是/proxy/info，那么请求会被解析为/info
            // '^/proxy' : ''
        },
	}
}

//使用proxy代理
if(http.dev.PROXY){
	app.use('/kjy', proxy(http.server));
}

init();

function init(){
	const config = require('./webpack.dev.js')();
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}));
	
	app.use(webpackHotMiddleware(compiler, {
		log: false
	}));
}

// Serve the files on port 3000.
app.listen(http.port, function () {
	let url = 'http://127.0.0.1:' + http.port;
	console.log(url);
	opn(url);
});

app.use(express.static('./static'));
app.use(express.static('./dist'));

//使用mock数据
// app.use('/mock', express.static('./mock'));
mock(app);