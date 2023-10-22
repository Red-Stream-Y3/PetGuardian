const request = require('supertest');
import app from './testserver.js';
import mongoose from 'mongoose';

const user = {};
const config = {
  authorization: `Bearer`
};

beforeAll(async () => {
  await request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'testuser1@redstream.com',
      password: 'Test@12345'
    })
    .then((res) => {
      console.log('logged in');
      user.token = res.body.token;
      user._id = res.body._id.toString();
      user.username = res.body.username;

      config.authorization = config.authorization + ' ' + user.token;
    });
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Pet Services Controller', () => {
  test('It should require authorization', async () => {
    const response = await request(app).get('/api/v1/services');
    expect(response.statusCode).toBe(401);
  });

  test('It should respond with JSON', async () => {
    const response = await request(app)
      .get('/api/v1/services')
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('It should get all service providers', async () => {
    const response = await request(app)
      .get('/api/v1/services')
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should get service provider by id', async () => {
    const response = await request(app)
      .get(`/api/v1/services/${user._id}`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]._id).toBe(user._id);
  });

  test('It should search service providers', async () => {
    const response = await request(app)
      .get(`/api/v1/services/search/malabe`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should get hire requests made by me', async () => {
    const response = await request(app)
      .get(`/api/v1/services/hire/${user._id}`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should get hire requests made for me', async () => {
    const response = await request(app)
      .get(`/api/v1/services/myhire/651905dc1a22eacde138ed5a`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should get hire request by id', async () => {
    const response = await request(app)
      .get(`/api/v1/services/hire/getbyid/6522eb801e769f489af3d727`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
