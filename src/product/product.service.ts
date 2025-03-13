import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service'; // adjust path as needed
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {id},
    });
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: {id},
        data: {
          name: dto.name,
          price: dto.price,
          description: dto.description,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({
        where: {id},
      });
      return;
    } catch (error) {
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }
  }
}
