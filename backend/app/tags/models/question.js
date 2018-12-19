const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
const logger = require('../../logging/winston');
const [dbName, collection] = ['portal', 'questions'];
const dao = mongoUtils.crudify(mongoClient, dbName, collection);


/**
 * Gets aggregation pipeline to retrieve tags using searchQuery
 * @param {string} searchQuery
 * @return {Array} aggregation query array
 */
const searchTagsAggregation = (searchQuery) => {
    const tagTitleRegexp = new RegExp('^' + searchQuery, 'i');
    return [{
        $match: {
            'tags.title': tagTitleRegexp
        }
    },
    {
        '$unwind': {
            path: '$tags'
        }
    },
    {
        $match: {
            'tags.title': tagTitleRegexp
        }
    },
    {
        $project: {
            'title': '$tags.title',
            'background': '$tags.background',
            'color': '$tags.color',
            '_id': 0
        }
    },
    {
        $group: {
            _id: '$title',
            title: {
                $first: '$title'
            },
            background: {
                $first: '$background'
            },
            color: {
                $first: '$color'
            }
        }
    }
    ];
};


dao.searchTags = async function(searchQuery) {
    const client = await mongoClient;
    return client
        .db(dbName)
        .collection(collection)
        .aggregate(searchTagsAggregation(searchQuery))
        .toArray();
};

module.exports = dao;
