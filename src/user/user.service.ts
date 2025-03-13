import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    // If there's a new password, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      // If the user doesn't exist, prisma throws.
      // We can catch and re-throw NotFound if we want a custom message.
      throw new NotFoundException(`User with id "${id}" not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return;
    } catch (error) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
  }
}
