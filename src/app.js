const express = require('express'),
      path = require('path'),
      // morgan = require('morgan'),
      // myConnection = require('express-myconnection'),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      flash = require('connect-flash');

const app = express();

// importing routes
const routes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret:'thisismysecrctekeyfhrgfgrfrty84fwir76712321',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: oneDay },
}));
app.use(flash());
app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});
// app.use(morgan('dev'));
// app.use(myConnection(mysql, connection, 'single'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use(routes);
// app.use('/import-csv', importCsvRoute);

// static files
app.use(express.static(path.join(__dirname, 'public')));
// starting the server
// console.log(path.join(__dirname, 'public'))
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
