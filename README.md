vue3 已经出来了，现在关注的热度也越来越高，新出来了很多新特性，并对TS进行了很好的支持。<br/>

本项目使用了webpack-dev-serve搭建。
```javascript
npm i; // 安装依赖
npm run dev;
```

vue 采用了monorepo模式。<br>

Vue3 将模块拆成了一个个的包，把这些包组成了一个Vue，我们可以但是分包使用不同的模块。<br>

monorepo是一种将多个package放在一个repo中的代码管理模式。<br>
vue3中使用yarn workspace + lerna来管理项目。<br>
`npm i lerna -g` <br>

```javascript
// package.json
{
    "workspaces": [
        "packages/*"
    ]
}
// 通过workspaces来指定需要管理的模块
```
在GitHub上下载vue-next，并安装。安装请使用**yarn install**，否则可能会丢包。<br>

在vue-next/目录下 lerna init 生成初始化配置文件，就可以通过lerna来管理当前项目的包。好处是，我们可以在一个项目里面管理多个包；而且这些包的发布、构建只需要写一套环境就可以了。<br>

```
├── packages
│   ├── compiler-core # 所有平台的编译器
│   ├── compiler-dom # 针对浏览器而写的编译器
│   ├── compiler-ssr # 针对服务器的编译器
│   ├── reactivity # 数据响应式系统
│   ├── runtime-core # 虚拟 DOM 渲染器 ，Vue 组件和 Vue 的各种API
│   ├── runtime-dom # 针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。
│   ├── runtime-test # 专门为测试写的runtime
│   ├── server-renderer # 用于服务端渲染SSR
│   ├── shared # 帮助方法
│   ├── template-explorer
│   └── vue # 构建vue runtime + compiler
```

lerna ls。可以列出当前项目**packages目录下**所有的包。但是有些包并没有列举出来，因为它不会列举私有模块。如vue-next/packages/runtime-test，就不会被列举出来，在runtime-test/package.json中配置了"private": true。<br>

# 了解响应式(reactivity)

先初始化一个webpack项目。下载vue-reactivity<br>
```javascript
npm init
npm i webpack webpack-cli --save-dev
npm i @vue/reactivity --save // 这就是Vue的响应式模块，可以在任何地方使用
```
[reactivity响应式实现](./src/myReactivity/reactive.js)

> 说明：在运行项目时，只需要注释src/index.js中`import './effectOfMyself'` 或者 `import './effectOfFrame'`就能看到vue/reactivity的效果和自己实现的效果

[segmentfault解析vue-next响应式](https://segmentfault.com/a/1190000023380448?utm_source=tag-newest)

[vue3响应式源码解析](https://www.it610.com/article/1280219960160829440.htm)

[vue3核心过程解析](https://www.it610.com/article/1269443923428806656.htm)


## ReactiveFlags  是一个枚举值

```javascript
export const enum ReactiveFlags {
    skip = '__v_skip',
    isReactive = '__v_isReactive',
    isReadonly = '__v_isReadonly',
    raw = '__v_raw',
    reactive = '__v_reactive',
    readonly = '__v_readonly'
}
// 它有什么用呢？举个例子，我们要定义一个不可被代理的对象：
import { ReactiveFlags, reactive, isReactive } from '@vue/reactivity'
const obj = {
    [ReactiveFlags.skip]: true
}
const proxyObj = reactive(obj)
console.log(isReactive(proxyObj)) // false
// markRaw函数就是使用类似的方式实现的
// 代理对象会通过 ReactiveFlags.raw 引用原始对象
// 原始对象会通过 ReactiveFlags.reactive 或 ReactiveFlags.readonly 引用代理对象
// 代理对象根据它是 reactive 或 readonly 的， 将 ReactiveFlags.isReactive 或 ReactiveFlags.isReadonly 属性值设置为true。
```







