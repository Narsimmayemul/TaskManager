const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
require('dotenv').config();
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const {email, username, password } = req.body;
    
    try {
        let existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({ error: 'User with this username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new User({email, username, password: hashedPassword });

        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.key);
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.key);

        res.json({ user, token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
