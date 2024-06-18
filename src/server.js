const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/tasks', auth , taskRoutes)

app.get('/' , (req , res)=>{
    try {
        res.status(200).send('This is Home Page');
    } catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
