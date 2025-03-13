import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../src/product/product.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('ProductService (Unit)', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('findAll should call prisma.product.findMany', async () => {
    prisma.product.findMany.mockResolvedValue([]);
    const result = await service.findAll();
    expect(prisma.product.findMany).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('create should call prisma.product.create', async () => {
    const mockDto = { name: 'Laptop', price: 1000 };
    prisma.product.create.mockResolvedValue({ id: '1', ...mockDto });
    const result = await service.create(mockDto as any);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: mockDto });
    expect(result).toEqual({ id: '1', ...mockDto });
  });
});
