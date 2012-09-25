// Express Errors Unit Tests
//

// MODULE DEPENDENCIES
// -------------------
var errors = require('../index'),
    should = require('should');

// TESTS
// -----

describe('Errors', function() {

  var fakeErr,
      fakeApp,
      fakeLoggerCalled,
      fakeLoggerArgs,
      fakeLogger,
      fakeReq,
      fakeRes,
      fakeNext;

  beforeEach(function (done){
    fakeErr = {};
    fakeApp = {
      callbacks: [],
      get: function () { return true },
      use: function (fn) { 
        this.callbacks.push(fn)
        return this
      },
      settings: {
        showStackError: true
      }
    };
    fakeLoggerCalled = 0;
    fakeLoggerArgs = undefined;
    fakeLogger = function () {
      fakeLoggerCalled += 1;
      fakeLoggerArgs = arguments;
    };
    fakeReq = {};
    fakeRes = {
      status: function () {},
      render: function () {}
    };
    fakeNext = function () {};
    done();
  });

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      errors.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

  describe('catch all', function () {

    it('should add a catch all middleware to the app that passes a NotFound error to next', function (done) {
      errors(fakeApp);
      fakeApp.callbacks[0].should.be.a('function');
      fakeApp.callbacks[0](fakeReq, fakeRes, function (err) {
        err.name.should.equal('Not Found');
        err.status.should.equal(404);
      })
      done();
    });

  });

  describe('error handler middleware', function () {

    var errorHandler;

    beforeEach(function (done) {
      errors(fakeApp, {
        logger: fakeLogger
      });
      errorHandler = fakeApp.callbacks[1];
      done();
    });

    it('should add an error handler middleware to the app', function (done) {
      errorHandler.should.be.a('function');
      done();
    });

    it('should call the custom logger function with the error', function (done) {
      errorHandler(fakeErr, fakeReq, fakeRes, fakeNext);
      fakeLoggerCalled.should.equal(1);
      fakeLoggerArgs[0].should.equal(fakeErr);
      done();
    });

    it('should render the correct template when error is an express-error', function (done){
      fakeErr = new errors.NotFound();
      fakeRes.render = function(view, options) {
        view.should.equal('errors/' + fakeErr.status);
        options.title.should.equal(fakeErr.status);
        done();
      };
      errorHandler(fakeErr, fakeReq, fakeRes, fakeNext);
    });

    it('should render 500 when error is any other Error', function (done){
      fakeErr = new Error();
      fakeRes.render = function(view, options) {
        view.should.equal('errors/500');
        options.title.should.equal(500);
        done();
      };
      errorHandler(fakeErr, fakeReq, fakeRes, fakeNext);
    });

  });

});