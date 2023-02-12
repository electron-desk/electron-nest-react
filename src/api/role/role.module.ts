import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/rolePermission.entity';
/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-07-23 18:31:25
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\api\role\role.module.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [SequelizeModule.forFeature([Role, RolePermission, Permission])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
