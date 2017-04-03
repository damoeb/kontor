'use strict';

const _ = require('lodash');
const es = require('../services/elasticsearch');
const index = 'inbox';
const type = 'posts';

es.assertIndex(index);

function reply(res, data) {
  res.json({
    posts: data
  });
}

function createResponseHandler(res) {
  return (error, response) => {
    if (error) {
      reply(res, {
        error: `${error}. ${response}`
      });
    } else {
      reply(res, {
        id: response._id
      });
    }
  }
}

function findInboxPost(req, res) {
  const id = req.swagger.params.id.value;
  console.log(`find in inbox ${id}`);

  es.client
    .get({
      index,
      type,
      id
    }, (error, response) => {
      if (error) {
        reply(res, {
          error: `${error}. ${response}`
        });
      } else {
        reply(res, response._source.doc);
      }
    });
}

function addPostToInbox(post, responseHandler) {
  const id = es.guid();

  // overwrite
  post.id = id;

  es.client.create({
    index,
    type,
    id,
    body: {
      doc: post
    }
  }, responseHandler);
}

function acceptInboxPost(req, res) {

}

function rejectInboxPost(req, res) {

}

function filterInboxPosts(req, res) {
  es.client.search({
      index,
      type
    }, (error, response) => {
      if (error) {
        reply(res, {
          error: `${error}. ${response}`
        });
      } else {
        const hits = _.map(response.hits.hits, function (hit) {
          return hit._source.doc;
        });
        reply(res, hits);
      }
    }
  );
}

module.exports = {
  filterInboxPosts: filterInboxPosts,
  findInboxPost: findInboxPost,
  acceptInboxPost: acceptInboxPost,
  rejectInboxPost: rejectInboxPost,
  addPostToInbox: (req, res) => {
    const post = req.swagger.params.post.value;
    console.log(`create ${post}`);

    addPostToInbox(post, createResponseHandler(res));
  }
};
