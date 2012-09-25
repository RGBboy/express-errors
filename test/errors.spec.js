// Express Errors Spec
//

// MODULE DEPENDENCIES
// -------------------

var app = require('../example/app'),
    should = require('should'),
    request = require('superagent');

// TESTS
// -----

describe('Errors', function(){

  var baseURL,
      server;

  before(function (done) {

    if (!app.address) {
      var port = 8000;
      server = app.listen(port);
      baseURL = 'http://localhost:' + port;
    } else {
      baseURL = 'http://localhost:' + app.address().port;
    }
    done();
  });

  after(function (done) {
    server.close(done);
  });

  it('should 404 when visiting a page that does not exist', function(done) {
    request
      .get(baseURL + '/a-page-that-does-not-exist')
      .end(function (err, res) {
        res.statusCode.should.equal(404);
        res.text.should.include('<title>404</title>');
        done();
      });
  });

  it('should 200 when visiting a page that does exist', function(done) {
    request
      .get(baseURL + '/')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.text.should.include('<title>Home</title>');
        done();
      });
  });

  describe('500', function () {

    it('should 500 when a route throws an error', function(done) {
      request
        .get(baseURL + '/error')
        .end(function (err, res) {
          res.statusCode.should.equal(500);
          res.text.should.include('<title>500</title>');
          done();
        });
    });

  });

});