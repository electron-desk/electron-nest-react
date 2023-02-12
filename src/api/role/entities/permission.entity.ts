import { RolePermission } from './rolePermission.entity';
import { Role } from '../../../api/role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-07-23 18:08:24
 * @LastEditTime: 2022-07-23 18:51:53
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\role\entities\permission.entity.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
@Table({
  timestamps: true,
  paranoid: true,
})
export class Permission extends Model<Permission> {
  @ApiProperty({
    name: 'name',
    description: '角色名称',
  })
  @Column
  name: string;
  @BelongsToMany(() => Role, () => RolePermission)
  role: Role;
  @ApiProperty({
    name: 'parentId',
    description: '父级id',
  })
  @Column
  parentId: number;

  @ApiProperty({
    name: 'uniqueKey',
    description: '唯一标识',
  })
  @Column
  uniqueKey: string;
}
