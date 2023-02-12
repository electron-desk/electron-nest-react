import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../../api/role/entities/permission.entity';
import { Admin } from '../entities/admin.entity';

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-14 21:16:15
 * @LastEditTime: 2022-08-14 21:18:58
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\admin\dto\current-response.dto.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export class CurrentResponseDto {
  @ApiProperty({
    name: 'admin',
    description: '当前登录用户详情',
  })
  admin: Admin;
  @ApiProperty({
    name: 'permissionList',
    description: '当前登录用户权限列表',
    type: [Permission],
  })
  permissionList: Permission[];
}
