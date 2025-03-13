import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<{
    access_token: string;
    access_expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
  }> {
    // 1) Check if the user exists
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Could also throw UnauthorizedException; your choice
      throw new NotFoundException('User not found');
    }

    // 2) Compare plaintext vs hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3) Prepare token payload
    const payload = { sub: user.id, role: user.role };

    // 4) Define expirations (in seconds)
    const accessExpiresIn = 60 * 15;      // 15 minutes
    const refreshExpiresIn = 60 * 60 * 24 * 7; // 7 days

    // 5) Sign the tokens
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'ACCESS_TOKEN_SECRET',
      expiresIn: accessExpiresIn,
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'REFRESH_TOKEN_SECRET',
      expiresIn: refreshExpiresIn,
    });

    // 6) Return both tokens + expirations
    return {
      access_token,
      access_expires_in: accessExpiresIn,
      refresh_token,
      refresh_expires_in: refreshExpiresIn,
    };
  }

  async register(dto: RegisterDto) {
    // (Optional) Disallow creating admin users via this public register endpoint:
    // if (dto.role?.toUpperCase() === 'ADMIN') {
    //   throw new ForbiddenException('Cannot register admin via this endpoint');
    // }

    // 1) Ensure the email is not already in use
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    // 2) Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3) Create the user in DB
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          // Default to USER if no role provided, or use the one passed in
          role: dto.role || 'USER',
        },
      });
      return user;
    } catch (error) {
      // Catch unique constraint errors from Prisma
      if (error.code === 'P2002') {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  verifyRefreshToken(token: string) {
    // Use the refresh token secret
    const options: JwtVerifyOptions = {
      secret: process.env.JWT_REFRESH_SECRET || 'REFRESH_TOKEN_SECRET',
    };
    try {
      return this.jwtService.verify(token, options);
    } catch {
      // If invalid or expired => 401
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  generateAccessToken(payload: any) {
    // e.g. 1 hour for new access tokens
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'ACCESS_TOKEN_SECRET',
      expiresIn: '10d',
    });
  }
}
