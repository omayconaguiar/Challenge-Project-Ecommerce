import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.product.findMany({
      where: {userId},
      include: {cartItems: true},
    });
  }

  async findOne(id: string, userId: string) {
    const product = await this.prisma.product.findFirst({
      where: {id, userId},
      include: {cartItems: true},
    });
    if (!product) {
      throw new NotFoundException(
        `Product not found or you do not have permission.`,
      );
    }
    return product;
  }

  async create(userId: string, dto: CreateProductDto) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: dto.name,
          price: dto.price,
          description: dto.description,
          userId,
        },
        include: {cartItems: true},
      });

      const cartItem = await tx.cartItem.create({
        data: {
          productId: product.id,
          userId,
          quantity: dto.quantity || 1,
          color: dto.color,
          size: dto.size,
          notes: dto.notes,
        },
      });

      return {...product, cartItem};
    });
  }

  async update(id: string, userId: string, dto: UpdateProductDto) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: {id, userId},
        data: {
          name: dto.name,
          price: dto.price,
          description: dto.description,
        },
        include: {cartItems: true},
      });

      await tx.cartItem.updateMany({
        where: {productId: id, userId},
        data: {
          quantity: dto.quantity,
          color: dto.color,
          size: dto.size,
          notes: dto.notes,
        },
      });

      return product;
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findFirst({
        where: {id, userId},
        include: {cartItems: true},
      });
      if (!product)
        throw new NotFoundException('Product not found or unauthorized');

      await tx.cartItem.deleteMany({where: {productId: id}});

      await tx.product.delete({where: {id}});

      return {
        message: `Product deleted successfully.`,
        deletedCartItems: product.cartItems,
      };
    });
  }
}
