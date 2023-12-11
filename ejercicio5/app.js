const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const session = require('express-session');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const restrictedRouter = require('./routes/restricted');


app.locals.title = "Demo Login";




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "La frase que querais",
  resave: false,
  saveUninitialized: true
}));



app.use((req, res, next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if (message) res.locals.message = `<p>${message}</p>`;
  if (error) res.locals.error = `<p>${error}</p>`;
  next();
});


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restricted', restricted, restrictedRouter);
app.use('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("login");
  }
}


// Chat-related logic


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
