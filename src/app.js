const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, specs } = require('./swagger');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use(taskRoutes);
app.use(userRoutes);

module.exports = app;
