import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token with Admin role',
    required: true,
  })
  @ApiOperation({ summary: 'List all users (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all users',
    schema: {
      example: [
        {
          id: 'user-uuid-123',
          email: 'someuser@example.com',
          role: 'USER',
          createdAt: '2023-09-01T10:00:00.000Z',
          updatedAt: '2023-09-05T14:22:30.000Z'
        },
        {
          id: 'user-uuid-456',
          email: 'admin@example.com',
          role: 'ADMIN',
          createdAt: '2023-08-15T08:15:10.000Z',
          updatedAt: '2023-09-05T14:22:30.000Z'
        }
      ]
    }
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token with Admin role',
    required: true,
  })
  @ApiOperation({ summary: 'Get one user by id (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user with the given id',
    schema: {
      example: {
        id: 'user-uuid-123',
        email: 'someuser@example.com',
        role: 'USER',
        createdAt: '2023-09-01T10:00:00.000Z',
        updatedAt: '2023-09-05T14:22:30.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token with Admin role',
    required: true,
  })
  @ApiOperation({ summary: 'Update one user by id (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user',
    schema: {
      example: {
        id: 'user-uuid-123',
        email: 'updateduser@example.com',
        role: 'USER',
        createdAt: '2023-09-01T10:00:00.000Z',
        updatedAt: '2023-09-06T09:45:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token with Admin role',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete one user by id (Admin only)' })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
