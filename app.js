var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var register = require('./routes/register');
var users = require('./routes/users');
var article = require('./routes/article');
var login = require('./routes/login');
var app = express();

// view engine setup
//設定views資料夾為存放範本檔（視圖）的地方，dirname為全域變數，儲存目前正在執行的指令檔所在的資料夾
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//設定視圖範本引擎為ejs
app.use(session({secret : 'HelloExpressSESSION'}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//設定public資料夾為存放靜態檔案的資料夾

app.use('/', routes);
app.use('/users', users);
app.use('/article', article);
app.use('/register', register);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;//匯出app實例供其他模組應用
