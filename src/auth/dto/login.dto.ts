import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@company.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password!: string;
}
