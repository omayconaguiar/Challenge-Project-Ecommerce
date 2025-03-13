import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ProductModule} from './product/product.module';
import {CartModule} from './cart/cart.module';
import {AppController} from './app.controller';
import {ConfigService} from '@nestjs/config';

@Module({
  controllers: [AppController],
  imports: [AuthModule, UserModule, ProductModule, CartModule],
  providers: [ConfigService],
})
export class AppModule {}
