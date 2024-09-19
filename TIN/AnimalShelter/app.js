var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const visitorRouter = require('./routes/visitorRoute');
const employeeRouter = require('./routes/employeeRoute');
const dogRouter = require('./routes/dogRoute');
const contractRouter = require('./routes/contractRoute');
const taskRouter = require('./routes/taskRoute');


const visApiRouter = require('./routes/api/VisitorApiRoute');
const empApiRouter = require('./routes/api/EmployeeApiRoute');
const dogApiRouter = require('./routes/api/DogApiRoute');
const contrApiRouter = require('./routes/api/ContractApiRoute');
const taskApiRouter = require('./routes/api/TaskApiRoute');

const authUtil = require('./utils/authUtils');
const i18n = require('i18n');
i18n.configure({
    locales: ['en', 'ru'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true,
    cookie: 'acme-hr-lang',
});

const fmt = require(`./utils/dateFormatting`);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//dateFormatting
app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
});

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const admin = req.session.admin;
    const visi = req.session.visi;
    const empi = req.session.empi;

    res.locals.loggedUser = loggedUser;
    res.locals.admin = admin;
    res.locals.visi = visi;
    res.locals.empi = empi;


    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }

    next();
});

app.use(i18n.init);
app.use(cookieParser('secret'));
app.use((req, res, next) => {
    if (!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use('/', indexRouter);
app.use('/visitors', authUtil.permitAuthentificatedUser, visitorRouter);
app.use('/employees', authUtil.permitAuthentificatedUser, authUtil.permitEmployee, employeeRouter);
app.use('/dogs', dogRouter);
app.use('/contracts', authUtil.permitAuthentificatedUser, contractRouter);
app.use('/tasks', authUtil.permitAuthentificatedUser, authUtil.permitEmployee, taskRouter);


//api routers
app.use('/api/visitors', visApiRouter);
app.use('/api/employees', empApiRouter);
app.use('/api/dogs', dogApiRouter);
app.use('/api/contracts', contrApiRouter);
app.use('/api/tasks', taskApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;