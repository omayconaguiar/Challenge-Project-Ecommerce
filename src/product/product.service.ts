import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    // Return all products from the DB
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    // Attempt to find the product by its primary key
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    // Create a new product record
    // Adjust fields according to your Prisma schema
    return this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description, // optional if your schema has description? or not
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    // Attempt an update; if the product doesn't exist, Prisma throws an error we can catch
    try {
      return await this.prisma.product.update({
        where: { id },
        data: {
          name: dto.name,
          price: dto.price,
          description: dto.description,
        },
      });
    } catch (error) {
      // If the record wasn't found or any other DB error, throw 404
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return; // or return something if you prefer
    } catch (error) {
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }
  }
}
