const request = require('supertest');
import app from './testserver.js';
import mongoose from 'mongoose';

const user = {};
const config = {
  authorization: `Bearer`
};

beforeAll(async () => {
  //
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Controller', () => {
  test('It should not allow weak passwords', async () => {
    const requestBody = {
      username: 'testuser',
      firstName: 'test',
      lastName: 'user',
      email: 'test@redstream.com',
      password: 'password' //weak password
    };

    const response = await request(app).post('/api/v1/users').send(requestBody);

    expect(response.status).toBe(400);
  });

  test('It should not allow duplicate emails', async () => {
    const requestBody = {
      username: 'testuser',
      firstName: 'test',
      lastName: 'user',
      email: 'testuser1@redstream.com',
      password: 'Test@12345'
    };

    const response = await request(app).post('/api/v1/users').send(requestBody);

    expect(response.status).toBe(400);
  }, 30000);

  test('It should create a new user', async () => {
    const requestBody = {
      username: 'newtestuser',
      firstName: 'test',
      lastName: 'user',
      email: 'newtestuser@redstream.com',
      password: 'NewTest@12345'
    };

    const response = await request(app).post('/api/v1/users').send(requestBody);

    expect(response.status).toBe(201);
  });

  test('It should login a user', async () => {
    const requestBody = {
      email: 'newtestuser@redstream.com',
      password: 'NewTest@12345'
    };

    const response = await request(app)
      .post('/api/v1/users/login')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('username');

    user.token = response.body.token;
    user._id = response.body._id.toString();
    user.username = response.body.username;

    config.authorization = config.authorization + ' ' + user.token;
  });

  test('It should not login a user with wrong password', async () => {
    const requestBody = {
      email: 'newtestuser@redstream.com',
      password: 'wrongpassword'
    };

    const response = await request(app)
      .post('/api/v1/users/login')
      .send(requestBody);

    expect(response.status).toBe(401);
  });

  test('It should delete user by id', async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${user._id}`)
      .set('Authorization', config.authorization);

    expect(response.status).toBe(200);
  });
});
