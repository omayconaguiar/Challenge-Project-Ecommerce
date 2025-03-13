import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsOptional, IsNumber, IsNotEmpty} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop X',
    description: 'The name of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1299.99,
    description: 'The price of the product',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'High-end gaming laptop with RGB keyboard',
    description: 'A brief description of the product',
    required: true,
  })
  @IsString()
  description: string;
}
