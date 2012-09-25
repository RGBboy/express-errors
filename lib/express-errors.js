// Error Component
//

// MODULE DEPENDENCIES
// -------------------

var errors = require('./errors'),
    util = require('util');

// MODULE EXPORTS
// --------------

// Exports function that can be used with express app.error();
exports = module.exports = function (app, options) {

  options = options || {};
  var logger = options.logger || function (err) {};

  if(!app.get('view engine')) {
    options.plain = true;
  };

  // 404 if request has not been handled
  app.use(function (req, res, next) {
    next(new exports.NotFound());
  });

  // add error handler to the app
  app.use(function (err, req, res, next) {

    logger(err);

    if(exports.hasOwnProperty(err.type)){
      res.status(err.status);
      if (options.plain) {
        res.send({ error: err.name }, err.status);
        return
      } else {
        res.render('errors/' + err.status, {
          title: err.status
        });
      };
      return;
    } else {
      // 500 for all other errors
      res.status(500);
      if (options.plain) {
        res.send({ error: 'Internal Server Error' }, 500);
        return
      } else {
        res.render('errors/500', {
          title: 500
        });
      };
      return;
    };

  });

};

exports.defineError = function (options) {

  var fn = function (msg) {
    var self = this;
    self.message = msg || 'Error';
    self.type = options.type;
    self.name = options.name;
    self.status = options.status;

    Error.call(self, self.message);
    Error.captureStackTrace(self, arguments.callee);
    
    return self;
  }

  fn.prototype.__proto__ = Error.prototype;

  // add to the exports
  exports[options.type] = fn;

  return fn;

};

// Define each error in errors.js
for (var error in errors) {
  exports.defineError({
    type: error,
    name: errors[error].name,
    status: errors[error].status
  });
};
