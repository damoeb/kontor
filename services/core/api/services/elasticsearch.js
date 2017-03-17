const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: [
    {
      host: 'elasticsearch',
      auth: 'elastic:changeme',
      // protocol: 'https',
      port: 9200
    }
  ],
  log: 'trace'
});

module.exports = {
  client
};
