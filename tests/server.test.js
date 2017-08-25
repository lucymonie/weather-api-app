const test = require('tape');
const server = require('../src/server.js');

test('Check if server is running', function (t) {
  server.start(err => {
    t.error(err);
    server.stop();
    t.end();
  });
});

test('Check successful route & handling', function(t) {
  var options = {
    method: 'GET',
    url: '/'
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.end();
  });
});
