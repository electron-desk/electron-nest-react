/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-04 21:54:38
 * @LastEditTime: 2022-08-04 21:59:18
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\decorator\api.array.response.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-04-28 15:04:16
 * @LastEditTime: 2022-06-15 12:53:47
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \nest-admin\src\decorator\api.map.response.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ2: 大前端QQ交流群2: 777642000
 * @公众账号: 乐编码
 * 善始者实繁 , 克终者盖寡
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ResponseArrayto {
  @ApiProperty({
    description: '状态：true表示成功；false表示失败',
    type: 'boolean',
    default: true,
  })
  success: boolean;
  @ApiProperty({
    description: '提示信息',
    required: false,
  })
  errorMessage: string;
}

export const ApiArrayResponse = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseArrayto) },
          {
            properties: {
              data: {
                type: 'array',
                description: '数据',
                items: {
                  allOf: [{ $ref: getSchemaPath(model) }],
                },
              },
            },
          },
        ],
      },
    }),
  );
};
