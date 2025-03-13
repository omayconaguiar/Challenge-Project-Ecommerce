// test/integration/product.integration.spec.ts

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ProductController (Integration)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const dynamicEmail = `prod+${Date.now()}@test.com`;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: dynamicEmail, password: 'prodpass' })
      .expect(201);

    const loginResp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: dynamicEmail, password: 'prodpass' })
      .expect(200);

    token = `Bearer ${loginResp.body.access_token}`;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /products -> create a product', async () => {
    const resp = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', token)
      .send({ name: 'Laptop Z', price: 799.99 })
      .expect(201);

    expect(resp.body.name).toBe('Laptop Z');
  });

  it('GET /products -> list products', async () => {
    const resp = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', token)
      .expect(200);

    expect(Array.isArray(resp.body)).toBe(true);
  });
});
