import { RolePermission } from './rolePermission.entity';
import { Permission } from './permission.entity';
/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-07-24 20:22:51
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\api\role\entities\role.entity.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Role extends Model<Role> {
  @ApiProperty({
    name: 'name',
    description: '角色名称',
  })
  @Column
  name: string;

  @ApiProperty({
    name: 'status',
    description: '角色状态',
    enum: ['0：禁用', '1：正常'],
  })
  @Column({ type: DataType.CHAR(1) })
  status: string;
  @ApiProperty({
    name: 'permissionList',
    type: [Permission],
    description: '权限列表',
  })
  @BelongsToMany(() => Permission, () => RolePermission)
  permissionList: Permission[];
}
