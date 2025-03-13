import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'ADMIN', required: false })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: 'newpass', required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
