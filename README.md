# 学习webpack源码

希看一点能学到一点

- Compiler对象

1. 创建改对象的唯一参数是option.context
2. 其余参数直接挂在到该对象的实例上
3. 内部插件和外部插件作用域该对象的实例
4. 该对象通过钩子这种发布订阅模式完成插件模式

- run
- watch
