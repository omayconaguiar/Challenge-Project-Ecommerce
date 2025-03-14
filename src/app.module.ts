// src/app.module.ts

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {ProductModule} from './product/product.module';
import {PrismaService} from './prisma/prisma.service';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
