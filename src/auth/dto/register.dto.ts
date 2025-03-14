import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, MinLength} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@company.com',
    description: 'The user’s email address.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secretPassword',
    description: 'Desired account password.',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user.',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user (Default: USER).',
    required: false,
  })
  @IsOptional()
  role?: string;
}
