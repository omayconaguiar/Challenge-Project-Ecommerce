// test/unit/product.service.spec.ts

import {Test, TestingModule} from '@nestjs/testing';
import {ProductService} from '../../src/product/product.service';
import {PrismaService} from '../../src/prisma/prisma.service';

describe('ProductService (Unit)', () => {
  let productService: ProductService;

  const prismaMock = {
    product: {
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findFirst: jest.fn(),
      findFirstOrThrow: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {provide: PrismaService, useValue: prismaMock},
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('findAll should return an array of products', async () => {
    (prismaMock.product.findMany as jest.Mock).mockResolvedValue([{id: '1'}]);
    const products = await productService.findAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products[0].id).toBe('1');
  });

  it('create should return created product', async () => {
    (prismaMock.product.create as jest.Mock).mockResolvedValue({id: '2'});
    const product = await productService.create({
      name: 'Laptop',
      price: 999,
      description: 'Gaming laptop',
    });
    expect(product.id).toBe('2');
  });
});
