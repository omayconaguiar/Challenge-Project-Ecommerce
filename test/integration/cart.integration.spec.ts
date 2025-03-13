// test/integration/cart.integration.spec.ts

import { INestApplication, CanActivate, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';
import { PrismaService } from '../../src/prisma/prisma.service';

class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    req.user = { id: '11111111-1111-1111-1111-111111111111' };
    return true;
  }
}

describe('CartController (Integration) - Mock userId', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();

    await prisma.user.create({
      data: {
        id: '11111111-1111-1111-1111-111111111111',
        email: 'fake@user.com',
        password: 'hashed-password',
      },
    });

    await prisma.product.create({
      data: {
        id: 'prod-123',
        name: 'Notebook Falso',
        price: 999,
      },
    });
  });

  afterAll(async () => {
    await prisma.cartItem.deleteMany();
    await prisma.product.delete({ where: { id: 'prod-123' } });
    await prisma.user.delete({ where: { id: '11111111-1111-1111-1111-111111111111' } });
    await app.close();
  });

  it('POST /cart/items -> should add an item to the cart', async () => {
    const resp = await request(app.getHttpServer())
      .post('/cart/items')
      .send({ productId: 'prod-123', quantity: 2 })
      .expect(201);

    expect(resp.body.productId).toBe('prod-123');
    expect(resp.body.userId).toBe('11111111-1111-1111-1111-111111111111');
  });

  it('GET /cart/items -> should list items for the user', async () => {
    const resp = await request(app.getHttpServer())
      .get('/cart/items')
      .expect(200);

    expect(Array.isArray(resp.body)).toBe(true);
    expect(resp.body.length).toBeGreaterThanOrEqual(1);
  });
});
