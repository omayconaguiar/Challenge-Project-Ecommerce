import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    example: 'product-uuid',
    description:
      'The unique identifier for the product being added to the cart',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'Number of items (defaults to 1 if not provided)',
  })
  @IsNumber()
  @IsOptional()
  quantity?: number = 1;

  @ApiProperty({
    example: 'Red',
    required: false,
    description:
      'An optional color choice for the product, if applicable (e.g., clothing or accessories)',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    example: 'M',
    required: false,
    description:
      'An optional size for the product, if applicable (e.g., clothes or shoes)',
  })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({
    example: 'Please include gift wrap',
    required: false,
    description:
      'Any special instructions or notes for this cart item (gift wrap, personal message, etc.)',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
