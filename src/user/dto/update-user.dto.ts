import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString, IsEmail, MinLength} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({example: 'Jane Doe'})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({example: 'jane@example.com'})
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({example: 'newStrongPassword!'})
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
