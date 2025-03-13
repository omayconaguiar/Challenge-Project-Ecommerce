// login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@company.com',
    description: 'The user’s email address used for login.'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The user’s password.'
  })
  @IsNotEmpty()
  password: string;
}
