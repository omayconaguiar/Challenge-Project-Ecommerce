import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../src/product/product.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('ProductService (Unit)', () => {
  let productService: ProductService;
  const userId = 'user-123';

  const prismaMock = {
    product: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
    cartItem: {
      create: jest.fn(),
      updateMany: jest.fn(),
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn(async (fn) => fn(prismaMock)),
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('findAll should return an array of products', async () => {
    (prismaMock.product.findMany as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Laptop' },
    ]);

    const products = await productService.findAll(userId);
    expect(Array.isArray(products)).toBe(true);
    expect(products[0].id).toBe('1');
  });

  it('create should return created product and cart item', async () => {
    const productData = {
      name: 'Laptop',
      price: 999,
      description: 'Gaming laptop',
      quantity: 1,
      color: 'Red',
      size: 'M',
      notes: 'Gift wrap',
    };

    (prismaMock.product.create as jest.Mock).mockResolvedValue({
      id: '2',
      ...productData,
      userId,
      cartItems: [],
    });

    (prismaMock.cartItem.create as jest.Mock).mockResolvedValue({
      id: 'cart-1',
      productId: '2',
      userId,
      quantity: 1,
      color: 'Red',
      size: 'M',
      notes: 'Gift wrap',
    });

    const product = await productService.create(userId, productData);
    expect(product.id).toBe('2');

    expect(prismaMock.product.create).toHaveBeenCalledWith({
      data: { name: 'Laptop', price: 999, description: 'Gaming laptop', userId },
      include: { cartItems: true }, // 🔹 Considerando `include`
    });

    expect(prismaMock.cartItem.create).toHaveBeenCalledWith({
      data: {
        productId: '2',
        userId,
        quantity: 1,
        color: 'Red',
        size: 'M',
        notes: 'Gift wrap',
      },
    });
  });

  it('update should modify and return updated product and cart item', async () => {
    const updateData = {
      name: 'Updated Laptop',
      price: 1099,
      description: 'Better gaming laptop',
      quantity: 2,
      color: 'Blue',
      size: 'L',
      notes: 'Urgent delivery',
    };

    (prismaMock.product.update as jest.Mock).mockResolvedValue({
      id: '1',
      ...updateData,
      userId,
      cartItems: [],
    });

    (prismaMock.cartItem.updateMany as jest.Mock).mockResolvedValue({
      count: 1,
    });

    const updatedProduct = await productService.update('1', userId, updateData);
    expect(updatedProduct.name).toBe('Updated Laptop');
    expect(updatedProduct.price).toBe(1099);

    expect(prismaMock.product.update).toHaveBeenCalledWith({
      where: { id: '1', userId },
      data: { name: 'Updated Laptop', price: 1099, description: 'Better gaming laptop' },
      include: { cartItems: true }, // 🔹 Incluindo `cartItems`
    });

    expect(prismaMock.cartItem.updateMany).toHaveBeenCalledWith({
      where: { productId: '1', userId },
      data: {
        quantity: 2,
        color: 'Blue',
        size: 'L',
        notes: 'Urgent delivery',
      },
    });
  });

  it('remove should delete a product and its cart items', async () => {
    (prismaMock.product.findFirst as jest.Mock).mockResolvedValue({
      id: '1',
      userId,
    });

    (prismaMock.cartItem.deleteMany as jest.Mock).mockResolvedValue({
      count: 1,
    });

    (prismaMock.product.delete as jest.Mock).mockResolvedValue({
      id: '1',
    });

    await productService.remove('1', userId);

    expect(prismaMock.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { productId: '1' },
    });

    expect(prismaMock.product.delete).toHaveBeenCalledWith({
      where: { id: '1' }, // 🔹 Removemos `userId`, pois não é necessário para `delete`
    });
  });
});
