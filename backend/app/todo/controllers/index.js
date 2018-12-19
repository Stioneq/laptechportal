const TodoModel = require('../models/todo.js');
const logger = require('../../logging/winston');
exports.findAll = async (req, res) => {
    logger.info('Try to get all todos');
    const todos = await TodoModel.findAll();
    return res.json(todos);
}

exports.findOne = (req, res) => TodoModel.findOne(req.params.id);

exports.insertOne = (req, res) => {
    const a = req.body;
}
exports.deleteOne = (req, res) => res.send('Delete one');