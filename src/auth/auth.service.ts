import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {RegisterDto} from './dto/register.dto';
import {JwtService, JwtVerifyOptions} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    access_expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
  }> {
    const user = await this.prisma.user.findUnique({where: {email}});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const secret = process.env.ROLE_SECRET || 'some-random-secret-key';
    const hashedRole = crypto
      .createHmac('sha256', secret)
      .update(user.role)
      .digest('hex');

    const payload = {sub: user.id, role: hashedRole};

    const accessExpiresIn = 60 * 15;
    const refreshExpiresIn = 60 * 60 * 24 * 7;

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'ACCESS_TOKEN_SECRET',
      expiresIn: accessExpiresIn,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'REFRESH_TOKEN_SECRET',
      expiresIn: refreshExpiresIn,
    });

    return {
      access_token,
      access_expires_in: accessExpiresIn,
      refresh_token,
      refresh_expires_in: refreshExpiresIn,
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: {email: dto.email},
    });

    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: dto.role || 'USER',
        },
      });

      return user;
    } catch (error) {
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
