import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseMapDto } from './decorator/api.map.response';
import { PaginatedDto } from './decorator/api.paginated.response';
import { HttpExceptionFilter } from './http-exception.filter';
import { json } from 'express';
import { ResponseArrayto } from './decorator/api.array.response';
import { NestAdminReactModule } from './nest-admin-react.module';
async function bootstrap() {
  const app = await NestFactory.create(NestAdminReactModule);
  app.use(json({ limit: '100mb' }));
  app.setGlobalPrefix('/admin');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('武汉跃码教育--中台系统项目实战API文档')
    .setDescription(
      'nest(nodejs)+mysql开发的后台管理系统 [最爱白菜吖](https://space.bilibili.com/388985971)',
    )
    .setContact('最爱白菜吖', '', '1355081829@qq.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto, ResponseMapDto, ResponseArrayto],
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3006, () => {
    console.log('http://127.0.0.1:3006/api');
  });
}
bootstrap();
