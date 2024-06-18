const Task = require('../models/task');

exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;

    const parsedDueDate = new Date(dueDate);

    const today = new Date();
    if (parsedDueDate < today) {
        return res.status(400).json({ error: 'Due date cannot be before today' });
    }

    try {
        const task = new Task({
            title,
            description,
            dueDate: parsedDueDate, 
            priority,
            status,
            owner: req.user._id
        });

        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTaskById = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send("Task Not Found");
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'dueDate', 'priority', 'status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).send("Task Not Found");
        }
        res.status(200).send("Task Not Found" + task);
    } catch (error) {
        res.status(500).send(error);
    }
};
