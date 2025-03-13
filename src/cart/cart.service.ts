import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });
  }

  async addItem(
    userId: string,
    productId: string,
    quantity = 1,
    color?: string,
    size?: string,
    notes?: string,
  ) {
    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, productId, color, size },
    });
    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + quantity,
        },
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
          color,
          size,
          notes,
        },
      });
    }
  }

  async removeItem(cartItemId: string) {
    try {
      return await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } catch {
      throw new NotFoundException(`Cart item "${cartItemId}" not found.`);
    }
  }
}
