/*!
 * express-errors
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
* Module Dependencies
*/

var errors = require('./errors'),
    util = require('util');

/**
 * Attach error handler to the application
 *
 * @param {express.HTTPServer} app
 * @param {object} options
 * @api public
 */
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
      var publicError = new exports.InternalServerError();
      res.status(publicError.status);
      if (options.plain) {
        res.send({ error: publicError.name }, publicError.status);
        return
      } else {
        res.render('errors/' + publicError.status, {
          title: publicError.status
        });
      };
      return;
    };

  });

};

/**
* Library version.
*/

exports.version = '0.0.1';

/**
 * Define a custom error
 *
 * @param {object} options
 * @api public
 */

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

  // add error type to the exports
  exports[options.type] = fn;

  return fn;

};


/**
 * Define default errors from errors.js
 */
for (var error in errors) {
  exports.defineError({
    type: error,
    name: errors[error].name,
    status: errors[error].status
  });
};
