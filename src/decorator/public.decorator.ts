/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-10-20 12:36:30
 * @LastEditTime: 2022-10-20 12:36:46
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-lesson\src\decorator\public.decorator.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
