import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UserController (Integration)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip('POST /users -> create user', async () => {
    const resp = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'uniqueUser@test.com', password: 'abc123' })
      .expect(201);
    userId = resp.body.id;
    expect(resp.body.email).toBe('uniqueUser@test.com');
  });

  it.skip('GET /users/:id -> get user by id', async () => {
    const resp = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);
    expect(resp.body.id).toBe(userId);
  });
});
