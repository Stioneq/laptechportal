const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
const logger = require('../../logging/winston');
const { ObjectId } = require('mongodb');
const [dbName, collection] = ['portal', 'questions'];
const dao = mongoUtils.crudify(mongoClient, dbName, collection);

const baseInsert = dao.insertOne;
dao.insertOne = async function(item) {
  item.postedDate = new Date();
  item.modifiedDate = new Date();
  baseInsert.call(this, item);
};

/**
 * Left-outer join ratings collection to fetch ratings
 * for all questions for given user
 * @param {string} username
 * @return{Array} aggregation pipeline
 */
const userRatingStages = username => [
  {
    $lookup: {
      from: 'ratings',
      let: {
        questionId: '$_id'
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [username, '$userId']
                },
                {
                  $eq: ['$$questionId', '$questionId']
                }
              ]
            }
          }
        },
        {
          $project: {
            rating: 1,
            _id: 0
          }
        }
      ],
      as: 'userRating'
    }
  },
  {
    $unwind: {
      path: '$userRating',
      preserveNullAndEmptyArrays: true
    }
  }
];

dao.findQuestionPreviews = async function(username) {
  const client = await mongoClient;
  const aggregation = [
    {
      $project: {
        id: '$_id',
        title: 1,
        author: 1,
        rating: 1,
        userRating: '$userRating.rating',
        tags: 1,
        postedDate: 1,
        modifiedDate: 1,
        _id: 0
      }
    },
    {
      $sort: {
        postedDate: -1
      }
    }
  ];
  if (username) {
    aggregation.unshift(...userRatingStages(username));
  }
  return client
    .db(dbName)
    .collection(collection)
    .aggregate(aggregation)
    .toArray();
};
dao.updateQuestionRating = async function(questionId, rating) {
  logger.info(`Update question=${questionId} rating=${rating}`);
  const client = await mongoClient;
  return client
    .db(dbName)
    .collection(collection)
    .updateOne(
      {
        _id: ObjectId(questionId)
      },
      {
        $set: {
          rating: rating
        }
      }
    );
};

dao.addCommentsCount = async function(questionId, count) {
  logger.info(`Change comments count for question=${questionId} ${count}`);
  const client = await mongoClient;
  return client
    .db(dbName)
    .collection(collection)
    .updateOne(
      {
        _id: ObjectId(questionId)
      },
      {
        $inc: {
          comments: count
        }
      }
    );
};

dao.batchUpdateComments = async function(questionsComments) {
  const client = await mongoClient;
  const bulkOp = client
    .db(dbName)
    .collection(collection)
    .initializeUnorderedBulkOp();
  questionsComments.forEach(questionComment => {
    bulkOp
      .find({
        _id: ObjectId(questionComment.id)
      })
      .updateOne({
        $set: {
          comments: questionComment.comments
        }
      });
  });
  return bulkOp.execute();
};

dao.findDistinctIds = async function() {
  const client = await mongoClient;
  return client
    .db(dbName)
    .collection(collection)
    .find({})
    .project({
      _id: 1
    })
    .toArray();
};
module.exports = dao;
