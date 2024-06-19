const request = require('supertest');
const app = require('../app');
const Task = require('../models/task');
const User = require('../models/user');

beforeEach(async () => {
    await Task.deleteMany();
    await User.deleteMany();
});

describe('Task Management API', () => {
    let authToken;

    beforeEach(async () => {
        
        const user = await request(app)
            .post('/signup')
            .send({ username: 'testuser', password: 'password' , email :"testuser@gmail.com" });
        authToken = user.body.token;
    });

    test('Should create a new task', async () => {
        await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: "Sample Task 10",
                description: "This is a sample task description",
                dueDate: "2024-06-19",
                priority: "low",
                status:"pending"
            })
            .expect(201);
    });

    test('Should get user-specific tasks', async () => {
        // Create a task
        const task = await Task.create({
            title: 'Test Task',
            description: 'Test description',
            dueDate: '2024-12-31',
            priority: 'high',
            status: 'pending',
            owner: (await User.findOne({ username: 'testuser' }))._id
        });

        // Get tasks for the authenticated user
        await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .then((response) => {
                expect(response.body.length).toBe(1);
                expect(response.body[0]._id).toBe(task._id.toString());
            });
    });

    test('Should update a task', async () => {
        // Create a task
        const task = await Task.create({
            title: 'Test Task',
            description: 'Test description',
            dueDate: '2024-12-31',
            priority: 'high',
            status: 'pending',
            owner: (await User.findOne({ username: 'testuser' }))._id
        });

        // Update the task
        await request(app)
            .patch(`/api/tasks/${task._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ description: 'Updated description' })
            .expect(200);

        // Verify the updated task
        const updatedTask = await Task.findById(task._id);
        expect(updatedTask.description).toBe('Updated description');
    });

    test('Should delete a task', async () => {
        // Create a task
        const task = await Task.create({
            title: 'Test Task',
            description: 'Test description',
            dueDate: '2024-12-31',
            priority: 'high',
            status: 'pending',
            owner: (await User.findOne({ username: 'testuser' }))._id
        });

        // Delete the task
        await request(app)
            .delete(`/api/tasks/${task._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);

        // Verify the task is deleted
        const deletedTask = await Task.findById(task._id);
        expect(deletedTask).toBeNull();
    });

    test('Should not create a task with due date before today', async () => {
        await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Past Due Task',
                description: 'Task with past due date',
                dueDate: '2020-12-31', // Past date
                priority: 'medium',
                status: 'pending'
            })
            .expect(400, { error: 'Due date cannot be before today' });
    });

    test('Should not update a task with invalid updates', async () => {
        // Create a task
        const task = await Task.create({
            title: 'Test Task',
            description: 'Test description',
            dueDate: '2024-12-31',
            priority: 'high',
            status: 'pending',
            owner: (await User.findOne({ username: 'testuser' }))._id
        });

        // Attempt to update the task with an invalid update
        await request(app)
            .patch(`/api/tasks/${task._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ invalidField: 'Invalid value' })
            .expect(400, { error: 'Invalid updates!' });
    });

    // Add more tests for other CRUD operations and error handling...

    // Example of an error handling test
    test('Should return 404 if task not found', async () => {
        const nonExistingTaskId = '60c3a1c52b3c671d287e1e99'; // Non-existing task ID
        await request(app)
            .get(`/api/tasks/${nonExistingTaskId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404);
    });
});
