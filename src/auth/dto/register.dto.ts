import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@company.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ example: 'ADMIN', required: false })
  @IsOptional()
  role?: string;
}
