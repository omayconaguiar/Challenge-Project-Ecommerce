// register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({
    example: 'user@company.com',
    description: 'The user’s email address.'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secretPassword',
    description: 'Desired account password.'
  })
  @IsNotEmpty()
  password: string;

  @Exclude()
  role?: string;
}
