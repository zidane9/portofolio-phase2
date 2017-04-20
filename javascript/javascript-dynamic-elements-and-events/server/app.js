var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');

var index = require('./routes/index');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(3000, function(){
  console.log('listening to port 3000');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
