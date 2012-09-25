// Error Component Example

// MODULE DEPENDENCIES
// -------------------

var express = require('express'),
    app = module.exports = express(),
    errors = require('../index')

// Views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

// Configuration

app.use(express.static(__dirname + '/public'));

// Routes

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Home'
  });
});

// To test 500 error
app.get('/error', function (req, res, next) {
  throw new Error('Test 500 Error');
});

// Error Handler
errors(app, {
  logger: function (err) {
    if ('test' != process.env.NODE_ENV) {
      console.log('Custom Logger:')
      console.log(err);
      console.log(err.stack)
      console.log(err instanceof errors.NotFound)
    }
  }
});

// MODULE EXPORTS
// --------------

if (!module.parent) {
  app.listen(8000);
  console.log('Express app started on port 8000');
};