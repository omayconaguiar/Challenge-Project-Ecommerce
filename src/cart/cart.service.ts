import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForUser(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async addItem(userId: string, productId: string, quantity = 1) {
    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, productId },
    });
    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      return this.prisma.cartItem.create({
        data: { userId, productId, quantity },
      });
    }
  }

  removeItem(cartItemId: string) {
    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }
}
