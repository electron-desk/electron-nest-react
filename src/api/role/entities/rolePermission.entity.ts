import { Permission } from './permission.entity';
import { Role } from '../../../api/role/entities/role.entity';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-07-23 18:27:21
 * @LastEditTime: 2022-07-23 18:36:54
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\role\entities\rolePermission.entity.ts
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
export class RolePermission extends Model<RolePermission> {
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ForeignKey(() => Permission)
  @Column
  permissionId: number;
}
