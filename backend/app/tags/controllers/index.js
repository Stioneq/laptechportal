const {
    QuestionModel
} = require('../models');


exports.searchTags = async (req, res) => {
    if (req.query.q === '') {
        res.json([]);
    } else {
        const response = await QuestionModel.searchTags(req.query.q);
        res.json(response);
    }
};
