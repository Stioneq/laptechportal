const {
    Router
} = require('express');
const todoController = require('../controllers');
const router = Router();

router
    .get('/', todoController.findAll)
    .get('/:id', todoController.findOne)
    .post('/', todoController.insertOne)
    .delete('/:id', todoController.deleteOne);


module.exports = router;