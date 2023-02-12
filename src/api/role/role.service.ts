import { RolePermission } from './entities/rolePermission.entity';
import { Permission } from './entities/permission.entity';
/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-08-12 20:56:55
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\api\role\role.service.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(Permission) private permissionModel: typeof Permission,
    @InjectModel(RolePermission)
    private rolePermissionModel: typeof RolePermission,
  ) {}
  create(role: Role) {
    return this.roleModel.create(role);
  }
  findByName(name: string) {
    return this.roleModel.findOne({ where: { name } });
  }
  findAll(page = 1, limit = 1, name = '') {
    const where = {};
    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    return this.roleModel.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [['id', 'desc']],
      include: [Permission],
    });
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id, { include: [Permission] });
  }

  update(id: number, role: Role) {
    return this.roleModel.update(role, { where: { id } });
  }

  remove(id: number) {
    return this.roleModel.destroy({ where: { id } });
  }
  addPermission(permission) {
    return this.permissionModel.create(permission);
  }
  findPermissionList(permissionList: number[]) {
    return this.permissionModel.findAll({
      where: {
        id: {
          [Op.in]: permissionList,
        },
      },
    });
  }
  async addRolePermission(
    roleId: number,
    rolePermissionList: RolePermission[],
  ) {
    await this.rolePermissionModel.destroy({
      where: { roleId },
    });
    for (const p of rolePermissionList) {
      const res = await this.rolePermissionModel.findOne({
        where: {
          roleId: p.roleId,
          permissionId: p.permissionId,
        },
        paranoid: false,
      });
      if (res !== null) {
        this.rolePermissionModel.update(
          { deletedAt: null },
          {
            where: {
              roleId: p.roleId,
              permissionId: p.permissionId,
            },
            paranoid: false,
          },
        );
      } else {
        this.rolePermissionModel.create(p);
      }
    }
  }
  getAllPermission() {
    return this.permissionModel.findAll();
  }
  async getAdminRolePermission(adminId: number, roleId: number) {
    if (adminId === 1) {
      return await this.permissionModel.findAll();
    }
    const res = await this.roleModel.findByPk(roleId, {
      include: [Permission],
    });
    return res;
  }
}
