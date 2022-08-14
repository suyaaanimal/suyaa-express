import request from 'supertest';
import express from 'express';

const crypto = require('crypto');

const app = express();
describe('POST auth/signup', () => {
  it('Success: Create New Account', async () => {
    const N = 16;
    const username = crypto.randomBytes(N).toString('base64').substring(0, N);
    const walletAddress = crypto.randomBytes(N).toString('base64').substring(0, N);

    request(app)
      .post('/auth/signup')
      .send({
        username,
        password: 'password',
        wallet_address: walletAddress,
      })
      .expect(200);
  });
});

describe('POST auth/signin', () => {
  it('Success: Login', async () => {
    request(app)
      .post('/auth/signin').send({
        username: 'nyan',
        password: 'neko',
      })
      .expect(200);
  });
});
