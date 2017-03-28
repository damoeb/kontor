'use strict';

const _ = require('lodash');
const elasticsearch = require('../services/elasticsearch');
const index = 'posts';
const type = 'posts';

elasticsearch.assertIndex('posts');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

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
function findPost(req, res) {
  const id = req.swagger.params.id.value;
  console.log(`find ${id}`);

  elasticsearch.client
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
  const id = guid();

  // overwrite
  post.id = id;

  elasticsearch.client.create({
    index,
    type,
    id,
    body: {
      doc: post
    }
  }, responseHandler);

}

function filterPosts(req, res) {
  elasticsearch.client.search({
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
  filterPosts: filterPosts,
  findPost: findPost,
  updatePost: (req, res) => {
    const id = req.swagger.params.id.value;
    const post = req.swagger.params.post.value;
    console.log(`update ${id} ${post}`);

    // overwrite
    post.id = id;

    elasticsearch.client
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

    elasticsearch.client.delete({index, type, id}, (error, response) => {
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
//   elasticsearch.client.indices.delete({index}, function (error) {
//
//     elasticsearch.client.indices.create({index}, function (error) {
//
//       console.log('create posts');
//
//       createPost({
//         title: 'Panopticon',
//         url: 'https://www.youtube.com/watch?v=jqWXWNhfZQg',
//         description: 'Control on our daily lives increases and privacy is disappearing. How is this exactly happening and in which way will it effect all our lives? A film about the rise of the surveillance state into your life. Made in Holland.',
//         createdAt: new Date().getTime(),
//         tags: ['surveillance', 'documentation', '2013']
//       });
//
//       createPost({
//         title: 'Artificial Intelligence Bookshelf',
//         url: 'http://alumni.media.mit.edu/~jorkin/aibooks.html',
//         description: 'A list of useful books for game AI programming.',
//         createdAt: new Date().getTime(),
//         tags: ['ai', 'programming', 'ebooks']
//       });
//
//       createPost({
//         title: 'Wie gehen wir mit Komplexität um?',
//         url: 'https://kulturmanagement.wordpress.com/2009/03/26/wie-gehen-wir-mit-komplexitat-um/',
//         description: 'Unser Denken in festen Kategorien führt uns auf Dauer nicht weiter, wir müssen lernen, mit Chaos, Unordnung und Unschärfe umzugehen.',
//         createdAt: new Date().getTime(),
//         tags: ['systems', 'systemtheory', 'complexity', 'kruse']
//       });
//
//       createPost({
//         title: 'If you want to earn more, work less',
//         url: 'http://www.bbc.com/capital/story/20170112-if-you-want-to-earn-more-work-less',
//         description: 'Studies show people who work less are more likely to get a raise or bonus than those who overwork. Mark Johanson reports on the downside of long working hours..',
//         createdAt: new Date().getTime(),
//         tags: ['timemanagement', 'work']
//       });
//
//     });
//   });
//
// }, 5000);
