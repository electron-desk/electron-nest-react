<!--
 * @Author: 最爱白菜吖<1355081829@qq.com>
 * @Date: 2023-02-09 14:56:19
 * @LastEditTime: 2023-02-13 01:25:26
 * @LastEditors: 最爱白菜吖
 * @Description: 十年码农!精通react、vue、node、electron、php、go的拼写
 * @公众账号: 乐编码
 * @vscode主题: Halcyon Theme
 * @FilePath: \electron-nest-react\README.md
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved
-->
> 说明：`electron-vite-vue` 和 `electron-vite-react` 没有接口服务，想要查看最终效果，请移步 `electron-nest-admin`

# 相关项目

## gitee

[electron-vite-vue](https://gitee.com/electron-nest-admin/electron-vite-vue)

[electron-vite-react](https://gitee.com/electron-nest-admin/electron-vite-react)

[electron-nest-admin](https://gitee.com/electron-nest-admin/electron-nest-admin)
[electron-nest-react](https://gitee.com/electron-nest-admin/electron-nest-react.git)
## github

[electron-vite-vue](https://github.com/electron-desk/electron-vite-vue)

[electron-vite-react](https://github.com/electron-desk/electron-vite-react.git)

[electron-nest-admin](https://github.com/electron-desk/electron-nest-admin)
[electron-nest-react](https://github.com/electron-desk/electron-nest-react.git)


# 安装指南

## 安装 electron 镜像加速

```shell
npm config set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/

```

## electron-builder 镜像加速

```shell
npm config set ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
```

# 如何运行

## 开发模式

```shell
npm run dev
```

## 编译

```shell
npm run electron:build
```

> PS: 编译后的内容会输出到 build-electron 目录下。打包时自动采用 bytenode 进行加密，并且采用 v8-compile-cache 优化加速
