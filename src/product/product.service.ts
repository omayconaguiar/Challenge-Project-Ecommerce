import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }

  update(id: string, data: Partial<CreateProductDto>) {
    return this.prisma.product.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
