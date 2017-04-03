const elasticsearch = require('elasticsearch');
const _ = require('lodash');

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

function testConnection() {
  return new Promise((fulfill, reject) => {
    client.ping({
      requestTimeout: 30000
    }, function (error) {
      if (error) {
        reject();
      } else {
        fulfill();
      }
    });
  });
}

// TODO wrap every external dependency as a Service that provides minimal connectivity checks and avoids errors
// todo contract test

function waitForConnection() {
  return new Promise((fulfill, reject) => {
    console.log('ELASTICSEARCH: Trying to ping es');

    const tries = 5;
    let triesCount = 0;

    const timerId = setInterval(() => {
      triesCount++;
      console.log(`Waiting for elasticsearch (attempt ${triesCount})`);
      testConnection()
        .then(() => {
          clearInterval(timerId);
          fulfill();
        })
        .catch((err) => {
          if (tries <= triesCount) {
            clearInterval(timerId);
            reject(err);
          }
        });
    }, 5000);
  });
}

waitForConnection();

function assertIndex(indexName) {
  return waitForConnection().then(() => {
    return new Promise((fulfill, reject) => {
      client.indices.exists({
        index: indexName
      }, function (error, exists) {
        if (exists === true) {
          console.log(`Found index '${indexName}'`);
          fulfill(client);
        } else {
          client.indices.create({index: indexName}, function (error) {
            if (error) {
              console.error(`Failed to create index '${indexName}', reason: ${error}`);
              reject(error);
            } else {
              console.log(`Created index '${indexName}'`);
              fulfill(client);
            }
          });
        }
      });
    })
  });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


module.exports = {
  client,
  assertIndex,
  guid
};
