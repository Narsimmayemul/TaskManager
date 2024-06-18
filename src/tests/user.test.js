const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

beforeEach(async () => {
    await User.deleteMany();
});

test('Should signup a new user', async () => {
    await request(app).post('/users/signup').send({
        username: 'test',
        password: 'password'
    }).expect(201);
});

test('Should login existing user', async () => {
    await request(app).post('/users/signup').send({
        username: 'test',
        password: 'password'
    });
    await request(app).post('/users/login').send({
        username: 'test',
        password: 'password'
    }).expect(200);
});

