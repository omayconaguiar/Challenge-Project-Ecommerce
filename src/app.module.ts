import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
    // ... se tiver mais
  ],
})
export class AppModule {}
