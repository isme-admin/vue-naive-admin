<p align="center">
  <a href="https://github.com/zclzone/vue-naive-admin">
    <img alt="Vue Naive Admin Logo" width="200" src="./src/assets/images/logo.png">
  </a>
</p>
<p align="center">
  <a href="./LICENSE"><img alt="MIT License" src="https://badgen.net/github/license/zclzone/vue-naive-admin"/></a>
</p>

## 简介
Vue Naive Admin 是一款极简风格的后台管理模板，包含前后端解决方案，前端使用 Vite + Vue3 + Pinia + Unocss，后端使用 Nestjs + TypeOrm + MySql，简单易用，赏心悦目，历经十几次重构和细节打磨，诚意满满！！

## 设计理念

Vue Naive Admin 2022年2月开始开源，从 1.0 到现在的 2.0，一直秉持着`简单即正义`的理念，旨在帮助中小企业、在校大学生及个人开发者快速上手开发后台管理项目，为了降低使用者的学习成本，没有使用看似主流的 TypeScript（前端），这也使得 Vue Naive Admin 成为了市面上少有的 `使用 JavaScript 的 Vue3 后台管理模板`，而且还算优秀，得到了大量朋友的认可和喜爱。

## 特性

- 🆒 使用 **Vue3** 主流最新技术栈: `Vite + Vue3 + Pinia`
- 🍇 使用 **原子CSS**框架: `Unocss`，优雅、轻量、易用
- 🍍 集成 `Pinia` 状态管理，支持状态持久化
- 🤹 使用主流的 `iconify + unocss` 图标方案，支持自定义图标，支持动态渲染
- 🎨 使用 Naive UI，`极致简洁的代码风格和清爽的页面设计`，审美在线，主题轻松定制
- 👏 先进且易于理解的文件结构设计，多个模块之间**零耦合**，单个业务模块删除不影响其他模块
- 🚀 `扁平化路由`设计，每一个组件都可以是一个页面，告别多级路由 `KeepAlive` 难实现问题
- 🍒 `基于权限动态生成路由`，无需额外定义路由，`403和404页面可区分`，而不是无权限也跳404
- 🔐 基于Redis集成 `无感刷新`，用户登录态可控，安全与体验缺一不可
- ✨ 基于 Naive UI 封装 `message` 全局工具方法，支持批量提醒，支持跨页面单例模式
- ⚡️ 基于 Naive UI 封装常用的业务组件，包含`Page` 组件、`CRUD` 表格组件及 `Modal`组件等，简单易用，减少大量重复性工作

## 极致的性能

![](https://docs.isme.top/Public/Uploads/2023-11-18/6558568b2b476.png)
![](https://docs.isme.top/Public/Uploads/2023-11-18/655853caa9ce8.png)

## 2.0 和 1.0 区别

- 2.0 是基于 1.0 风格从 0 到 1 重新设计的，所以 2.0 看似跟 1.0 很像，但其实代码机构差别还挺大的。
- 1.0 只提供前端，后端使用 Mock 模拟的，而 2.0 是全栈版，提供真实的后端接口。
- 2.0 虽然版本高于 1.0，但复杂度却远低于 1.0，虽然 1.0 也很简单。
- 2.0 的灵活度远高于 1.0，只要你愿意，你可以为每个页面单独定制一个 layout

[体验1.0 | template.isme.top](https://template.isme.top)

[体验2.0 | admin.isme.top](https://admin.isme.top)

## Nestjs 后端

Vue Naive Admin 提供一套后端代码，技术栈使用 Nestjs + TypeOrm + MySql，内置 JWT、RABC及模板所需的一些基础接口。

*后续可能会提供 Java 版和 Go 版的，但由于精力有限，欢迎感兴趣的大佬基于前端提供对接好的后端项目，当然，并不局限于 Java 和 Go，已对接的后端项目会展示到仓库的 README 和 官方文档中*

- 源码-github: [isme-nest-serve | github](https://github.com/zclzone/isme-nest-serve)
- 源码-gitee: [isme-nest-serve | gitee](https://gitee.com/isme-admin/isme-nest-serve)
- 接口文档: [apidoc | isme-nest-serve](https://apifox.com/apidoc/shared-ff4a4d32-c0d1-4caf-b0ee-6abc130f734a)

## 快速上手
`npm run dev` 之后, 可能你要增加一个MENU item, 但是发现改了前端代码没有任何效果。 为什么? MENU 是通过后端传入的数据来实现的, 这个项目依赖后端实现基本的MENU, 参考: `env.development` 里面 `VITE_PROXY_TARGET = 'https://mock.apifox.com/m1/3776410-0-default/' ` 。 所以, 接下来你需要选择一个后端, 或者自己实现一个后端。 参考: permission table https://github.com/ituserxxx/naive-admin-go/blob/master/init.sql

## 版权说明

本项目使用 `MIT协议`，默认授权给任何人，被授权人可免费地无限制的使用、复制、修改、合并、发布、发行、再许可、售卖本软件拷贝、并有权向被供应人授予同等的权利，但必须满足以下条件:

- 复制、修改和发行本项目代码需包含原作者的版权及许可信息，包括但不限于文件头注释、协议等

简单来说，作者只想保留版权，没有任何其他限制。

## 其他已对接本项目的后端项目

- [isme-java-serve](https://github.com/DHBin/isme-java-serve): 一个轻量级的Java后端服务，基于SpringBoot、MybatisPlus、SaToken、MapStruct等实现，已对接 Vue Naive Admin 2.0。
- [naive-admin-go](https://github.com/ituserxxx/naive-admin-go): 一个 Go 后端服务，基于 gin、gorm、mysql、jwt和session，已对接 Vue Naive Admin 2.0。

