# Error Component

  Version 0.0.1

  Adds Error Handling to Express Application.

  Catches uncaught errors to stop system crashes.

  Adds a catch all for your routes and throws a 404.

  Provides a custom not found error to pass in

``` javascript
  var errors = require('./lib/errors');
  // In your middleware
  function middlewareFn (req, res, next) {
    next(new errors.NotFound());
  };
```

  This component should be added last in the Express configuration stack.

## Use

## Requires

### Views

  The following views should be made available in your view directory.

#### errors/404

  The view to render a 404

#### errors/500

  The view to render a 500

## Todo

  * Investigate other error types we may need
  * Can we change the interface so we do not have to pass in the application? Make it the same as the component interface?
  * Add ability to show error.stack in view