//***** debug/start.js *****
const webpack = require("../lib/index.js"); // 直接使用源码中的webpack函数
const config = require("./webpack.config");
const compiler = webpack(config);
compiler.run((err, stats) => {
	if (err) {
		console.error(err);
	} else {
		console.log(stats);
	}
});
