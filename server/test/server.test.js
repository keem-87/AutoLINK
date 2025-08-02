const request = require('supertest');
const app = require('../server');
describe('GET /api/hello', () => {
  it('wait for response...', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('IT LIVES');
  });
});
