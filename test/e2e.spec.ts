import request from 'supertest';
import { app } from '../src/app';

describe('E2E Tests', () => {
  // Antes de tudo, você poderia subir um DB de teste, rodar migrations, etc.

  it('GET /api/users should return 200', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
  });

  // Demais testes...
});
