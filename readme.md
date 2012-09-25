# Express Errors

  Error Handling for an Express Application.

  [![Build Status](https://secure.travis-ci.org/RGBboy/express-errors.png)](http://travis-ci.org/RGBboy/express-errors)

## Features

  * Adds a catch all middleware and throws a 404.
  * Provides custom errors to pass to next().

## Installation

  Works with Express 3.0.x

    npm install git://github.com/RGBboy/express-errors.git

## Usage

Require it:

``` javascript
  errors = require('express-errors');
```

Make use of the custom errors in your middleware:

``` javascript
  app.use(function (req, res, next) {
    next(new errors.NotFound());
  });
```

Call it after you have attached everything else with your application and some optional options

``` javascript
errors(app, {
  plain: false, // Defaults to false
  logger: function (err) { // Custom log function
    console.log('Custom Logger:')
    console.log(err);
    console.log(err.stack)
    console.log(err instanceof errors.NotFound)
  }
});
```

## Requires

### Views

  The following views should be made available in your view directory:

  * errors/400
  * errors/401
  * errors/403
  * errors/404
  * errors/500

## Todo

  * Investigate other error types we may need
  * Can we change the interface so we do not have to pass in the application? Make it the same as the component interface?
  * Add ability to show error.stack in view

## License 

(The MIT License)

Copyright (c) 2012 RGBboy &lt;me@rgbboy.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.