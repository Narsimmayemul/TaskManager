const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.post('/signup', userController.signup);
router.post('/login', userController.login);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: testuser
 *         password: password123
 *         email: testuser@gmail.com
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully signed up
 *       400:
 *         description: Bad request
 */
router.post('/signup', userController.signup);


module.exports = router;
