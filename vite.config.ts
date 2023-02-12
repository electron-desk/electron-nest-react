/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2023-02-12 21:44:46
 * @LastEditTime: 2023-02-12 21:47:47
 * @LastEditors: 最爱白菜吖
 * @FilePath: /electron-nest-react/vite.config.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2023 by 武汉跃码教育, All Rights Reserved.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electronPlugin from './plugin/main';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), electronPlugin()],
  base: './',
  build: {
    outDir: 'dist/view',
  },
});
