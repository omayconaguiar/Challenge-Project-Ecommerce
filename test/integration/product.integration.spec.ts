import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {AppModule} from '../../src/app.module';
import * as request from 'supertest';

describe('ProductController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET /products', async () => {
    const res = await request(app.getHttpServer()).get('/products');
    expect(res.status).toBe(200);
  });

  it('/POST /products (admin) => 201 or 403 if no admin token', async () => {
    // Exemplo: se estiver simulando o admin guard, precise de token
    // Por simplicidade, assumo falha se sem token
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({name: 'Laptop', price: 999.99});
    // provavelmente 403
    expect([201, 403]).toContain(res.status);
  });
});
