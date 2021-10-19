
var express = require('express');
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ 
  secret: 'kwonsoryeong1113',
  resave: false, 
  saveUninitialized: true,
}));
const routers = require('./api')
var sequelize = require('./models').sequelize; // sequelize require
sequelize.sync();

app.get('/', (req, res) => res.send('Hello World!'))


//api routes
app.use(routers.customer);
app.use(routers.customerenter);
app.use(routers.exercise);
app.use(routers.assignexercise);
app.use(routers.exerciselink);
app.use(routers.exercisepack);
app.use(routers.sales);
app.use(routers.manager);
app.use(routers.inbody);
app.use(routers.mobile);

module.exports = app;
