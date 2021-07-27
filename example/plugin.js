// 插件输出类
class RemoveCommentPlugin {
	constructor(opts) {
		this.opts = opts;
		this.externalModules = {};
	}
	apply(compiler) {
		// 去除注释正则
		const reg =
			/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g;

		// 注册自定义插件钩子到生成资源到 output 目录之前，拿到compilation对象（编译好的stream）
		compiler.hooks.emit.tap("RemoveComment", compilation => {
			// 遍历构建产物
			Object.keys(compilation.assets).forEach(item => {
				// .source()是获取构建产物的文本
				// .assets中包含构建产物的文件名
				let content = compilation.assets[item].source();
				content = content.replace(reg, function (word) {
					// 去除注释后的文本
					return /^\/{2,}/.test(word) ||
						/^\/\*!/.test(word) ||
						/^\/\*{3,}\//.test(word)
						? ""
						: word;
				});
				// console.info(content);
				// 更新构建产物对象
				compilation.assets[item] = {
					source: () => content,
					size: () => content.length
				};
			});
		});
	}
}

module.exports = RemoveCommentPlugin;
