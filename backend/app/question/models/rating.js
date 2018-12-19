const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
const { ObjectId } = require('mongodb');
const [dbName, collectionName] = ['portal', 'ratings'];
const dao = mongoUtils.crudify(mongoClient, dbName, collectionName);

/**
 * Returns first value from the cursor if it is not null. Returns defaultValue otherwise
 * @param {object} cursor
 * @param {any} defaultValue
 */
async function firstOrDefault(cursor, defaultValue) {
  const value = await cursor.next();
  return value || defaultValue;
}

/**
 * Calculates average rating for given question
 * @param {object} collection - Collection object
 * @param {ObjectId} questionId - ObjectId representation of the questionId
 */
async function getAverageRatingByQuestionId(collection, questionId) {
  const cursor = collection.aggregate([
    {
      $match: {
        questionId
      }
    },

    {
      $group: {
        _id: questionId,
        rating: {
          $avg: '$rating'
        }
      }
    },
    {
      $project: {
        _id: 0,
        rating: 1
      }
    }
  ]);

  return firstOrDefault(cursor, {
    rating: 0
  });
}

dao.findByUserIdAndQuestionId = async function(userId, questionId) {
  const client = await mongoClient;
  return client
    .db(dbName)
    .collection(collectionName)
    .findOne(
      {
        userId,
        questionId: ObjectId(questionId)
      },
      {
        projection: {
          rating: 1
        }
      }
    );
};

dao.updateRate = async function(rating) {
  const client = await mongoClient;
  rating.questionId = ObjectId(rating.questionId);
  const collection = client.db(dbName).collection(collectionName);
  const query = {
    userId: rating.userId,
    questionId: rating.questionId
  };
  if (rating.rating === 0) {
    await collection.remove(query);
  } else {
    await collection.updateOne(
      query,
      {
        $set: {
          rating: rating.rating
        }
      },
      {
        upsert: true
      }
    );
  }
  return getAverageRatingByQuestionId(collection, rating.questionId);
};
module.exports = dao;
