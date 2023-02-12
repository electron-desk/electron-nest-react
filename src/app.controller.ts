import { Role } from './api/role/entities/role.entity';
import { Permission } from './api/role/entities/permission.entity';
import { success } from './utils/response';
import { error } from './utils/response';
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './api/admin/admin.service';
import { RoleService } from './api/role/role.service';
import { UserService } from './api/user/user.service';

@ApiTags('初始化数据')
@Controller()
export class AppController {
  constructor(
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: '初始化数据',
  })
  @ApiQuery({
    name: 'key',
    description: '初始化数据的key',
    example: '1355081829',
  })
  @Get('init')
  async init(@Query('key') key: string) {
    if (key !== '1355081829') {
      return error('key错误');
    }
    const admin = await this.adminService.findOne(1);
    if (admin !== null) {
      return error('不可以重复初始化');
    }
    Array(15)
      .fill(0)
      .map((_, i) => {
        this.roleService.create({ name: `role ${i + 1}` } as Role);
      });

    this.adminService.create({
      username: '最爱白菜吖',
      email: '	1355081829@qq.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      salt: 'SBszpF',
      roleId: 1,
    });
    Array(50)
      .fill(0)
      .forEach((_, i) => {
        this.adminService.create({
          username: '最爱白菜吖-' + i,
          email: `1355081829${i}@qq.com`,
          password: 'e10adc3949ba59abbe56e057f20f883e',
          salt: 'SBszpF',
          roleId: 1,
        });
      });
    Array(50)
      .fill(0)
      .map((_, i) => {
        this.userService.create({
          username: `user-${i + 1}`,
          password: '135508188829',
          email: `135508188829${i}@qq.com`,
          salt: '135508188829',
        });
      });
    const permissionList = [
      {
        name: '仪表盘',
        parentId: 0,
        uniqueKey: '/dashboard',
      },
      {
        name: '用户管理',
        parentId: 0,
        uniqueKey: '/user',
        children: [
          {
            name: '用户列表',
            parentId: 0,
            uniqueKey: '/user/list',
            children: [
              {
                name: '删除用户',
                uniqueKey: 'deleteUser',
                parentId: 0,
              },
              {
                name: '添加用户',
                uniqueKey: 'addUser',
                parentId: 0,
              },
              {
                name: '编辑用户',
                uniqueKey: 'editUser',
                parentId: 0,
              },
            ],
          },
        ],
      },
      {
        name: '角色管理',
        uniqueKey: '/role',
        parentId: 0,
        children: [
          {
            name: '角色列表',
            uniqueKey: '/role/list',
            parentId: 0,
            children: [
              {
                name: '删除角色',
                uniqueKey: 'deleteRole',
                parentId: 0,
              },
              {
                name: '添加角色',
                uniqueKey: 'addRole',
                parentId: 0,
              },
              {
                name: '编辑角色',
                uniqueKey: 'editRole',
                parentId: 0,
              },
            ],
          },
        ],
      },
      {
        name: '管理员管理',
        uniqueKey: '/admin',
        parentId: 0,
        children: [
          {
            name: '管理员列表',
            uniqueKey: '/admin/list',
            parentId: 0,
            children: [
              {
                name: '删除管理员',
                uniqueKey: 'deleteAdmin',
                parentId: 0,
              },
              {
                name: '添加管理员',
                uniqueKey: 'addAdmin',
                parentId: 0,
              },
              {
                name: '编辑管理员',
                uniqueKey: 'editAdmin',
                parentId: 0,
              },
            ],
          },
        ],
      },
    ];
    // for (const p of permissionList) {
    //   let children = [];
    //   if (p.children) {
    //     children = p.children;
    //   }
    //   const res = await this.roleService.addPermission(
    //     p as unknown as Permission,
    //   );
    //   for (const c of children) {
    //     c.parentId = res.id;
    //     this.roleService.addPermission(c as Permission);
    //   }
    // }
    this.addPermission(permissionList);
    return success();
  }
  async addPermission(permissionList, parentId = 0) {
    for (const p of permissionList) {
      let children = [];
      if (p.children) {
        children = p.children;
      }
      p.parentId = parentId;
      const res = await this.roleService.addPermission(
        p as unknown as Permission,
      );
      if (children.length > 0) {
        await this.addPermission(children, res.id);
      }
    }
  }
}
