// test/integration/auth.integration.spec.ts

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('AuthController (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();

    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register -> should create a user', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', password: '123456' })
      .expect(201);

    expect(resp.body.email).toBe('test@example.com');
  });

  it('POST /auth/login -> should login existing user', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '123456' })
      .expect(200);

    expect(resp.body.access_token).toBeDefined();
  });
});
