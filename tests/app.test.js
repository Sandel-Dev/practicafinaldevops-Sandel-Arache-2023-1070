const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('responde con status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('responde con mensaje Hola Mundo!', async () => {
    const res = await request(app).get('/');
    expect(res.body.message).toBe('Hola Mundo!');
  });

  it('responde con status ok', async () => {
    const res = await request(app).get('/');
    expect(res.body.status).toBe('ok');
  });

  it('responde con un timestamp valido', async () => {
    const res = await request(app).get('/');
    expect(res.body.timestamp).toBeDefined();
    expect(new Date(res.body.timestamp).toString()).not.toBe('Invalid Date');
  });
});

describe('GET /health', () => {
  it('responde con status 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  it('devuelve status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('healthy');
  });
});

describe('Ruta no existente', () => {
  it('responde con 404 para rutas desconocidas', async () => {
    const res = await request(app).get('/ruta-que-no-existe');
    expect(res.statusCode).toBe(404);
  });
});
