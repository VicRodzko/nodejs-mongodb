const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Endpoints', () => {
  it('should get employees', async () => {
    const res = await request(app).get('/employees');
    const { body, statusCode } = res;
    const requestProperties = body[0];
    const resultProperties = [
      '_id',
      '__v',
      'name',
      'positions',
      'phone',
      'location',
      'email',
    ];

    expect(statusCode).toEqual(200);
    expect(res).toHaveProperty('get');
    expect(requestProperties).toHaveProperty(...resultProperties);
  });

  it('should GET return status code 404 (Not Found)', async () => {
    const res = await request(app).get('/employee');

    expect(res.statusCode).toEqual(404);
    expect(res).toHaveProperty('error');
  });

  it('should create a new employee', async () => {
    const res = await request(app).post('/employees').send({
      name: 'user',
      positions: 'developer',
      phone: '202-03-27',
      location: 'USA',
      email: 'email.@gmail.com',
    });
    const { statusCode } = res;

    expect(statusCode).toEqual(201);
  });

  it('should POST return status code 404 (Not Found)', async () => {
    const res = await request(app).post('/employee').send();
    const { statusCode } = res;

    expect(statusCode).toEqual(404);
    expect(res).toHaveProperty('error');
  });

  it('should POST return status code 400 (Bad Request)', async () => {
    const res = await request(app).post('/employees').send({
      name: 'Dracula',
    });
    const { statusCode } = res;

    expect(statusCode).toEqual(400);
    expect(res).toHaveProperty('error');
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const id = '';
    const res = await request(app).delete(`/employees/${id}`);
    const { statusCode } = res;

    expect(statusCode).toEqual(404);
    expect(res).toHaveProperty('error');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
