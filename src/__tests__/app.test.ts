import request from 'supertest';
import { app } from '../app';

describe('App basic tests', () => {
  it('GET /api/users - should return array (mock)', async () => {
    // Para um teste unitário real, você mockaria o userService
    const res = await request(app).get('/api/users');
    expect([200, 404]).toContain(res.statusCode);
    // Só um teste básico para ilustrar
  });
});
