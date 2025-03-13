import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Return all items for a specific user, optionally including product details.
   */
  async findAllForUser(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        // If you want to return product info:
        product: true,
      },
    });
  }

  /**
   * If an item with the same (userId, productId, color, size) exists, increment quantity.
   * Otherwise create a new cart item with the specified color/size/notes.
   */
  async addItem(
    userId: string,
    productId: string,
    quantity = 1,
    color?: string,
    size?: string,
    notes?: string
  ) {
    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, productId, color, size },
    });

    if (existing) {
      // Increment existing quantity
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + quantity,
        },
      });
    } else {
      // Create a new cart item
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

  /**
   * Remove the cart item by ID; throws 404 if item not found.
   */
  async removeItem(cartItemId: string) {
    try {
      return await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } catch (error) {
      // If no item with that ID, Prisma typically throws an error; transform to 404:
      throw new NotFoundException(`Cart item "${cartItemId}" not found.`);
    }
  }
}
