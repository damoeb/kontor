'use strict';

const _ = require('lodash');
const es = require('../services/elasticsearch');
const index = 'archive';
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
function findArchivePost(req, res) {
  const id = req.swagger.params.id.value;
  console.log(`find in archive ${id}`);

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

function createPost(post, responseHandler) {
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

function filterArchivePosts(req, res) {
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
  filterArchivePosts: filterArchivePosts,
  findArchivePost: findArchivePost,
  updatePost: (req, res) => {
    const id = req.swagger.params.id.value;
    const post = req.swagger.params.post.value;
    console.log(`update ${id} ${post}`);

    // overwrite
    post.id = id;

    es.client
      .update({
        index,
        type,
        id,
        body: {
          doc: post
        }
      }, (error, response) => {
          if (error) {
            reply(res, {
              error: `${error}. ${response}`
            });
          } else {
            reply(res, {
              id,
              updated: true
            });
          }
        }
      );
  },
  createPost: (req, res) => {
    const post = req.swagger.params.post.value;
    console.log(`create ${post}`);

    createPost(post, createResponseHandler(res));
  },
  deletePost: (req, res) => {
    const id = req.swagger.params.id.value;
    console.log(`delete ${id}`);

    es.client.delete({index, type, id}, (error, response) => {
        if (error) {
          reply(res, {
            error: `${error}. ${response}`
          });
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200);
          res.end();
          // reply(res, {
          //   id,
          //   deleted: true
          // });
        }
      }
    );
  }
};


// TODO rm initializer
// setTimeout(() => {
//
//   console.log('initialize');
//   es.client.indices.delete({index}, function (error) {
//
//     es.client.indices.create({index}, function (error) {
//
//       console.log('create posts');
//
      createPost({
        title: 'Panopticon',
        url: 'https://www.youtube.com/watch?v=jqWXWNhfZQg',
        description: 'Control on our daily lives increases and privacy is disappearing. How is this exactly happening and in which way will it effect all our lives? A film about the rise of the surveillance state into your life. Made in Holland.',
      });

      createPost({
        title: 'Artificial Intelligence Bookshelf',
        url: 'http://alumni.media.mit.edu/~jorkin/aibooks.html',
        description: 'A list of useful books for game AI programming.',
        tags: ['ai', 'programming', 'ebooks']
      });

      createPost({
        title: 'Wie gehen wir mit Komplexität um?',
        url: 'https://kulturmanagement.wordpress.com/2009/03/26/wie-gehen-wir-mit-komplexitat-um/',
        description: 'Unser Denken in festen Kategorien führt uns auf Dauer nicht weiter, wir müssen lernen, mit Chaos, Unordnung und Unschärfe umzugehen.',
        tags: ['systems', 'systemtheory', 'complexity', 'kruse']
      });

      createPost({
        title: 'If you want to earn more, work less',
        url: 'http://www.bbc.com/capital/story/20170112-if-you-want-to-earn-more-work-less',
        description: 'Studies show people who work less are more likely to get a raise or bonus than those who overwork. Mark Johanson reports on the downside of long working hours..',
        tags: ['timemanagement', 'work']
      });
//
//     });
//   });
//
// }, 5000);
