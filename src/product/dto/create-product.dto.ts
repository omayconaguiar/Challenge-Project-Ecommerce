import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop X' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'High-end gaming laptop', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
