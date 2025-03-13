import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(email: string, password: string): Promise<string | null> {
    // Busca user
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    // Exemplo: password plaintext (em prod use bcrypt)
    if (user.password !== password) return null;

    // Retorna token fictício (ex.: "fake-jwt-123"). Em prod use JWT real
    return `fake-token-for-${user.id}-role-${user.role}`;
  }

  async register(dto: RegisterDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        role: dto.role || 'USER',
      },
    });
  }
}
