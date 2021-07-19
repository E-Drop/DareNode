import config from 'config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../src/app';

describe('Integration test of the clients API', () => {
  describe('GET /clients', () => {
    let token, client;

    beforeEach(() => {
      client = {
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin'
      };

      token = jwt.sign(client, config.get('SECRET_KEY'), {
        expiresIn: '1m'
      });
    });

    it('test getClients endpoint should be 200', async () => {
      jest.setTimeout(30000);
      const clients = await supertest(app)
        .get('/clients')
        .set('Authorization', `Bearer ${token}`);

      expect(clients.status).toBe(200);
      expect(clients.body).toBeDefined();
    });

    it('test request without token should be 400', async () => {
      const clients = await supertest(app)
        .get('/policies')
        .set('Authorization', `Bearer `);

      expect(clients.status).toBe(400);
    });
  });
});
