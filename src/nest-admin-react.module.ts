import { Module } from '@nestjs/common';
import { AdminModule } from './api/admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { RoleModule } from './api/role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', '..', 'ui', 'nest-admin-react'),
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      autoLoadModels: true,
      storage:
        (process.env.USERPROFILE || process.env.HOME) +
        '/codedesk/.nest-admin-react.sqlite3',
      synchronize: true,
    }),
    JwtModule.register({
      secret: '1355081829@qq.com',
      secretOrPrivateKey: '1355081829@qq.com',
      signOptions: { expiresIn: '24h' },
    }),
    AdminModule,
    UserModule,
    RoleModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class NestAdminReactModule {}
