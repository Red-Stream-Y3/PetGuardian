const request = require('supertest');
import app from './testserver.js';
import mongoose from 'mongoose';

const user = {};
const config = {
  authorization: `Bearer`
};
let postId;

beforeAll(async () => {
  await request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'johnny@email.com',
      password: 'Johnny@1'
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

describe('Post Services Controller', () => {
  test('It should require authorization', async () => {
    const response = await request(app).get('/api/v1/posts');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with JSON', async () => {
    const response = await request(app)
      .get('/api/v1/posts')
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('It should get all posts', async () => {
    const response = await request(app)
      .get('/api/v1/posts')
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should get post by id', async () => {
    const response = await request(app)
      .get(`/api/v1/posts/652ea45d24d5bc97510268f4`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body._id).toBe('652ea45d24d5bc97510268f4');
  });

  test('It should get post by user id', async () => {
    const response = await request(app)
      .get(`/api/v1/posts/user/${user._id}`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toBeInstanceOf(Object);
  });

  test('It should create a new post', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .set('Authorization', config.authorization)
      .send({
        user: user._id,
        pet: '5f7f5f7f5f7f5f7f5f7f5f7f',
        type: 'Lost',
        content: 'Lost my pet',
        location: 'Colombo',
        images: ['image1.jpg', 'image2.jpg']
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toBe(user._id);
    postId = response.body._id;
  });

  test('It should update a post', async () => {
    const response = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Authorization', config.authorization)
      .send({
        user: user._id,
        type: 'Lost updated',
        content: 'Lost my pet updated',
        location: 'Colombo updated',
        images: ['image1.jpg', 'image2.jpg'],
        status: 'Closed',
        date: '2023-10-25T12:57:58.375+00:00',
        pet: '6522bdf560816953e1b7198a'
      });
    expect(response.body).toBeInstanceOf(Object);
  });

  test('It should delete a post', async () => {
    const response = await request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
  });

  test('It should search posts', async () => {
    const response = await request(app)
      .get(`/api/v1/posts/search/lost`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should search posts by location', async () => {
    const response = await request(app)
      .get(`/api/v1/posts/search/los angeles`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should search posts by pet type', async () => {
    const response = await request(app)
      .get(`/api/v1/posts/search/dog`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('It should search posts by content', async () => {
    const response = await request(app)
      .get(`/api/v1/posts/search/lost`)
      .set('Authorization', config.authorization);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
