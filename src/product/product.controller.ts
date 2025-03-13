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
@UseGuards(JwtAuthGuard) // All endpoints require a valid JWT, but NOT admin-specific
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Get all products'})
  @ApiResponse({
    status: 200,
    description: 'Returns an array of products.',
    schema: {
      example: [
        {
          id: '123',
          name: 'Laptop X',
          price: 1299.99,
          description: 'High-end gaming laptop',
        },
        {
          id: '124',
          name: 'Phone Y',
          price: 699.0,
          description: 'Latest smartphone with amazing camera',
        },
      ],
    },
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Get one product by ID'})
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the product',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the product with the given ID.',
    schema: {
      example: {
        id: '123',
        name: 'Laptop X',
        price: 1299.99,
        description: 'High-end gaming laptop',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Create a new product.',
  })
  @ApiBody({
    description: 'The product data to create',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully.',
    schema: {
      example: {
        id: '125',
        name: 'Tablet Z',
        price: 499.99,
        description: 'A lightweight tablet for everyday tasks',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if not logged in or token invalid.',
  })
  create(@Body() createDto: CreateProductDto) {
    return this.productService.create(createDto);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Update an existing product (partial update)'})
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to update',
    example: '123',
  })
  @ApiBody({
    description: 'Fields to update. All are optional.',
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated product.',
    schema: {
      example: {
        id: '123',
        name: 'Laptop X Updated',
        price: 1399.99,
        description: 'Updated gaming laptop with better GPU',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    return this.productService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token> (any logged-in user, admin not required)',
    required: true,
  })
  @ApiOperation({summary: 'Delete a product by ID'})
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
    description: 'Product not found.',
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
