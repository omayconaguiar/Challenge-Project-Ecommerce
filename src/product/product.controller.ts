import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Get all products (Only user’s own products)'})
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of the user’s products, including cart items.',
    schema: {
      example: [
        {
          id: '123',
          name: 'Laptop X',
          price: 1299.99,
          description: 'High-end gaming laptop',
          cartItems: [
            {
              quantity: 2,
              color: 'Black',
              size: '15-inch',
              notes: 'Gift wrap included',
            },
          ],
        },
      ],
    },
  })
  findAll(@Req() req) {
    return this.productService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Get one product by ID (Only user’s own products)'})
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the product',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns the product with the given ID, including cart item details.',
    schema: {
      example: {
        id: '123',
        name: 'Laptop X',
        price: 1299.99,
        description: 'High-end gaming laptop',
        cartItems: [
          {
            quantity: 1,
            color: 'Red',
            size: 'M',
            notes: 'Rush delivery requested',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found or does not belong to user.',
  })
  findOne(@Param('id') id: string, @Req() req) {
    return this.productService.findOne(id, req.user.id);
  }

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Create a new product (Linked to logged-in user)'})
  @ApiBody({
    description: 'The product data to create, including cart item details.',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully, including cart item details.',
    schema: {
      example: {
        id: '125',
        name: 'Tablet Z',
        price: 499.99,
        description: 'A lightweight tablet for everyday tasks',
        cartItems: [
          {
            quantity: 1,
            color: 'Silver',
            size: '10-inch',
            notes: 'Standard packaging',
          },
        ],
      },
    },
  })
  create(@Body() createDto: CreateProductDto, @Req() req) {
    return this.productService.create(req.user.id, createDto);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({
    summary: 'Update an existing product (Only user’s own products)',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to update',
    example: '123',
  })
  @ApiBody({
    description: 'Fields to update, including cart item details.',
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated product, including cart items.',
    schema: {
      example: {
        id: '123',
        name: 'Laptop X Updated',
        price: 1399.99,
        description: 'Updated gaming laptop with better GPU',
        cartItems: [
          {
            quantity: 2,
            color: 'Black',
            size: '17-inch',
            notes: 'Urgent shipping required',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found or does not belong to user.',
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
    @Req() req,
  ) {
    return this.productService.update(id, req.user.id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Delete a product by ID (Only user’s own products)'})
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to delete',
    example: '123',
  })
  @ApiResponse({
    status: 204,
    description: 'Product deleted successfully (no content returned).',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found or does not belong to user.',
  })
  remove(@Param('id') id: string, @Req() req) {
    return this.productService.remove(id, req.user.id);
  }
}
