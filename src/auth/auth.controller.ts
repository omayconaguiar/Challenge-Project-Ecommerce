import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  HttpException,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {AdminGuard} from './guards/admin.guard';
import {JwtAuthGuard} from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'User Registration'})
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        id: 'uuid-of-the-created-user',
        email: 'newuser@company.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., validation failed).',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict (e.g., if that email is already taken).',
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('register-admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Admin Registration (admin-only)',
    description: `IMPORTANT: This endpoint is for demonstration only. 
In production, you'd typically hide or strictly protect it so that 
only existing admins can create new admin accounts.`,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token with an ADMIN role',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Admin user created successfully',
    schema: {
      example: {
        id: 'uuid-of-the-created-admin',
        email: 'admin@company.com',
        role: 'ADMIN',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden if current user is not ADMIN.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict if the email is already taken.',
  })
  async registerAdmin(@Body() dto: RegisterDto) {
    dto.role = 'ADMIN';
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Login',
    description:
      'Logs in a user (email/password) and returns both access and refresh tokens with expiration info.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJI...',
        access_expires_in: 900,
        refresh_token: 'eyJhbGciOiJI...',
        refresh_expires_in: 604800,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if credentials are invalid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found if user does not exist (depending on your logic).',
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh Access Token',
    description:
      'Uses a valid refresh token to issue a new short-lived access token.',
  })
  @ApiResponse({
    status: 200,
    description: 'New access token returned',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJI...',
        access_expires_in: 900,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if refresh token is invalid or expired.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found if relevant resources are missing (e.g., user).',
  })
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      const decoded = this.authService.verifyRefreshToken(refreshToken);
      const newAccessToken = this.authService.generateAccessToken(decoded);
      return {
        access_token: newAccessToken,
        access_expires_in: 900,
      };
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
}
