// test/unit/cart.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../../src/cart/cart.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('CartService (Unit)', () => {
  let cartService: CartService;

  let prismaMock = {
    cartItem: {
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
    }
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
  });

  it('addItem: creates a new item if not found', async () => {
    (prismaMock.cartItem.findFirst as jest.Mock).mockResolvedValue(null);
    (prismaMock.cartItem.create as jest.Mock).mockResolvedValue({ id: '123' });

    const result = await cartService.addItem('user1', 'prod1', 2);
    expect(result.id).toBe('123');
  });

  it('addItem: increments quantity if item found', async () => {
    (prismaMock.cartItem.findFirst as jest.Mock).mockResolvedValue({
      id: '456',
      quantity: 2,
    });
    (prismaMock.cartItem.update as jest.Mock).mockResolvedValue({
      id: '456',
      quantity: 4,
    });

    const result = await cartService.addItem('user1', 'prod1', 2);
    expect(result.quantity).toBe(4);
  });
});
