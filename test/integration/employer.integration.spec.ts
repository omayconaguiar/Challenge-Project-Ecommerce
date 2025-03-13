import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

describe('EmployerController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /employers → should create an employer', async () => {
    // Se existir AdminGuard, precisamos simular a autenticação ou remover o guard
    // Para simplificar, imagine que passamos de alguma forma

    const dto = {
      email: 'admin@company.com',
      role: 'ADMIN',
      companyId: 'ea15c619-a350-4fef-aaf9-da41ddf5c5ee',
    };
    const response = await request(app.getHttpServer())
      .post('/employers')
      .send(dto)
      .expect(201);

    expect(response.body).toMatchObject({
      email: 'admin@company.com',
      role: 'ADMIN',
    });
  });
});
