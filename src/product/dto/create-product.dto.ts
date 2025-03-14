import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({example: 'Laptop X', description: 'The name of the product'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example: 1299.99, description: 'The price of the product'})
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'High-end gaming laptop with RGB keyboard',
    description: 'A brief description of the product',
  })
  @IsString()
  description: string;

  // Cart item details (optional)
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Quantity (defaults to 1)',
  })
  @IsNumber()
  @IsOptional()
  quantity?: number = 1;

  @ApiProperty({
    example: 'Red',
    required: false,
    description: 'Product color (if applicable)',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    example: 'M',
    required: false,
    description: 'Product size (if applicable)',
  })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({
    example: 'Please include gift wrap',
    required: false,
    description: 'Special instructions',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
