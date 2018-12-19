const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
const logger = require('../../logging/winston');
const { ObjectId } = require('mongodb');

const [dbName, collection] = ['portal', 'comments'];
const dao = mongoUtils.crudify(mongoClient, dbName, collection);

const baseInsert = dao.insertOne;
dao.insertOne = async function(item) {
  item.postedDate = new Date();
  item.modifiedDate = new Date();
  item.questionId = ObjectId(item.questionId);
  const result = (await baseInsert.call(this, item)).ops[0];
  result.id = result._id;
  delete result._id;
  return result;
};

const baseUpdate = dao.updateOne;
dao.updateOne = async function(item) {
  item.questionId = ObjectId(item.questionId);
  item.modifiedDate = new Date();
  item._id = item.id;
  delete item.icon;
  delete item.id;
  const result = await baseUpdate.call(this, item);
  if (result.modifiedCount === 1) {
    item.id = item._id;
    delete item._id;
    return item;
  }
};

dao.findAllByQuestionId = async function(questionId) {
  const client = await mongoClient;
  return client
    .db(dbName)
    .collection(collection)
    .aggregate([
      {
        $match: {
          questionId: ObjectId(questionId)
        }
      },
      {
        $project: {
          id: '$_id',
          _id: 0,
          text: 1,
          postedDate: 1,
          modifiedDate: 1,
          author: 1,
          questionId: 1
        }
      }
    ])
    .toArray();
};

dao.countCommentsGroupedByQuestionId = async function() {
  const client = await mongoClient;
  return client
    .db(dbName)
    .collection(collection)
    .aggregate([
      {
        $group: {
          _id: '$questionId',
          comments: {
            $sum: 1
          }
        }
      }
    ])
    .toArray();
};

module.exports = dao;
