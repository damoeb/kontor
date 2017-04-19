const _ = require('lodash');
const http = require('http');
const posts = {
  url: '/api/posts',
  method: 'POST',
  items: [
    {
      title: 'Panopticon',
      url: 'https://www.youtube.com/watch?v=jqWXWNhfZQg',
      description: 'Control on our daily lives increases and privacy is disappearing. How is this exactly happening and in which way will it effect all our lives? A film about the rise of the surveillance state into your life. Made in Holland.',
    },
    {
      title: 'Artificial Intelligence Bookshelf',
      url: 'http://alumni.media.mit.edu/~jorkin/aibooks.html',
      description: 'A list of useful books for game AI programming.',
      tags: ['ai', 'programming', 'ebooks']
    },
    {
      title: 'Wie gehen wir mit Komplexität um?',
      url: 'https://kulturmanagement.wordpress.com/2009/03/26/wie-gehen-wir-mit-komplexitat-um/',
      description: 'Unser Denken in festen Kategorien führt uns auf Dauer nicht weiter, wir müssen lernen, mit Chaos, Unordnung und Unschärfe umzugehen.',
      tags: ['systems', 'systemtheory', 'complexity', 'kruse']
    },
    {
      title: 'If you want to earn more, work less',
      url: 'http://www.bbc.com/capital/story/20170112-if-you-want-to-earn-more-work-less',
      description: 'Studies show people who work less are more likely to get a raise or bonus than those who overwork. Mark Johanson reports on the downside of long working hours..',
      tags: ['timemanagement', 'work']
    }
  ]
};

const inbox = {
  url: '/api/inbox',
  method: 'POST',
  items: [
    {
      title: 'Panopticon',
      url: 'https://www.youtube.com/watch?v=jqWXWNhfZQg',
      description: 'Control on our daily lives increases and privacy is disappearing. How is this exactly happening and in which way will it effect all our lives? A film about the rise of the surveillance state into your life. Made in Holland.',
    }
  ]
};


function push(group) {
  _.each(group.items, item => {
    const options = {
      host: 'localhost:8080',
      port: 8080,
      path: '/api/posts',
      headers: {'Content-Type': 'application/json'},
      method: group.method
    };

    http.request(options, function (res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    }).end();

  });
}
// curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{}' 'http://localhost:8080/api/inbox'
