import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('items')
  findAllItems() {
    // Normalmente precisa userId do token; aqui simulação:
    const userId = 'fake-user-id';
    return this.cartService.findAllForUser(userId);
  }

  @Post('items')
  addItem(@Body() dto: AddCartItemDto) {
    const userId = 'fake-user-id'; // Em prod, extrair do token
    return this.cartService.addItem(userId, dto.productId, dto.quantity);
  }

  @Delete('items/:id')
  removeItem(@Param('id') cartItemId: string) {
    return this.cartService.removeItem(cartItemId);
  }
}
