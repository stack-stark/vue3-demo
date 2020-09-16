# vue3构建新的中后台

## 启动
`要使用yarn安装依赖,npm安装会报错无法启动`

1.使用`yarn install` 命令安装npm包

2.运行`yarn serve`

3.打开`localhost:8080`;

## 开发时代理修改
修改`vue.config.js`中的`devServer`的`proxy`


## 正式开发前需要完成的内容
 - [x] 1.配置开发,打包参数

 - [x] 2.配置各环境(test,prod)

 - [x] 3.开发时代理处理

 - [x] 4.antd引入

 - [x] 5.http请求封装

 - [x] 6.状态页(404, 500...)

 - [ ] 7.登录页


## 需要封装的组件or功能

 - [X] 1.路由tab缓存

 - [] 2.菜单及路由权限处理

 - [] 3.通用表格组件封装

 - [] 4.上传组件封装

 - [] 5.websocket封装

 - [] 6.打包可接受主题色参数

 - [X] 7.多语言支持

 - [] 8.message封装

 - [] 9.树形组件

## 多语言
1.在`src\i18n\languages`对应的语言文件下配置相关文案,
``` ts
// enUS.ts
export const enUS = {
    named: 'named',
}

// zhCN.ts
export const zhCN = {
    named: '姓名',
}

// zhTW.ts
export const zhTW = {
    named: '姓名',
}
```

2.在页面中使用
``` html
<div>
  {{ $t("named") }}
</div>
<!-- 或者 -->
<i18n-t keypath="named">
    <template #name>
        <span>姓名</span>
    </template>
</i18n-t>
```
