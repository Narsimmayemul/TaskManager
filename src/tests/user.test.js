const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

beforeEach(async () => {
    await User.deleteMany();
});

test('Should signup a new user', async () => {
    await request(app).post('/signup').send({
        username: 'test',
        email: "test@gmail.com",
        password: 'password'
    }).expect(201);
});

test('Should login existing user', async () => {
    await request(app).post('/signup').send({
        username: 'test1',
        password: 'password',
        email:"test1@gmail.com"
    });
    await request(app).post('/login').send({
        username: 'test1',
        password: 'password'
    }).expect(200);
});

