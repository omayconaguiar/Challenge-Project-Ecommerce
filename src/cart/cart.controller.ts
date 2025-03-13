import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('items')
  @ApiOperation({ summary: 'List all cart items for the logged-in user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user)',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of cart items for the user',
    schema: {
      example: [
        {
          id: 'some-cart-item-id',
          userId: 'user-uuid',
          productId: 'product-uuid',
          quantity: 2,
          color: 'Red',
          size: 'M',
          notes: 'Please include gift wrap',
          product: {
            id: 'product-uuid',
            name: 'Laptop X',
            price: 1299.99,
            description: 'High-end gaming laptop',
          },
        },
      ],
    },
  })
  findAllItems(@Request() req) {
    const userId = req.user.id;
    return this.cartService.findAllForUser(userId);
  }

  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add an item to the cart or increment quantity',
    description:
      'If the product already exists in the cart (matching color/size), increments quantity; otherwise creates a new cart item.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user)',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Item added or updated in the cart',
    schema: {
      example: {
        id: 'some-cart-item-id',
        userId: 'user-uuid',
        productId: 'product-uuid',
        quantity: 3,
        color: 'Red',
        size: 'M',
        notes: 'Please include gift wrap',
      },
    },
  })
  addItem(@Request() req, @Body() dto: AddCartItemDto) {
    const userId = req.user.id;
    return this.cartService.addItem(
      userId,
      dto.productId,
      dto.quantity,
      dto.color,
      dto.size,
      dto.notes,
    );
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove an item from the cart by cartItem ID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user)',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Item removed successfully',
    schema: {
      example: {
        id: 'some-cart-item-id',
        userId: 'user-uuid',
        productId: 'product-uuid',
        quantity: 2,
        color: 'Red',
        size: 'M',
        notes: 'Please include gift wrap',
      },
    },
  })
  removeItem(@Param('id') cartItemId: string) {
    return this.cartService.removeItem(cartItemId);
  }
}
