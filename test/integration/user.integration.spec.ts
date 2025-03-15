import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';

describe('UserController (Integration)', () => {
  let app: INestApplication;
  let userId: string;
  let adminToken: string; 
  let testEmail: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await request(app.getHttpServer()).post('/auth/register-admin').send({
      email: 'admin@admin.com',
      password: '12345',
      name: 'Admin User',
    });

    const authResp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@admin.com', password: '12345' })
      .expect(200);

    adminToken = `Bearer ${authResp.body.access_token}`;

    testEmail = `test+${faker.string.uuid()}@example.com`;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register -> should create a user', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: testEmail, password: 'abc123', name: 'Test User' })
      .expect(201);

    userId = resp.body.id;
    expect(resp.body.email).toBe(testEmail);
  });

  it('GET /users/:id -> should get user by id (Admin Only)', async () => {
    const resp = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', adminToken) 
      .expect(200);

    expect(resp.body.id).toBe(userId);
    expect(resp.body.email).toBe(testEmail);
  });
});
