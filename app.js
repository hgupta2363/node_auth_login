var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash = require('connect-flash');
var ejs=require("ejs")
var http=require("http")
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var studentRouter=require("./routes/student")
//var loginRouter = require('./routes/login');
var mongoose=require("mongoose")
var session = require('express-session');
var cookieParser=require("cookie-parser")
var app = express();
http.createServer(app).listen(8080)
// config db
mongoose.connect('mongodb://localhost:27017/tes').then((db,err)=>
{
  if(err)
  console.log(err)
  else
  console.log("database is connected")
}

)
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,"public")))
app.use((req,res,next)=>{
  console.log(req.url)
  next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));


app.use(flash());
 app.use(function(req, res, next) {
 
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.email=req.signedCookies.email;
  res.locals.flag=req.flash('flagverify');
  res.locals.email_error=JSON.stringify(req.flash('email_error'))
  console.log("test")
  console.log(typeof(res.locals.email_error))
  next();
});


app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/student',studentRouter)
//app.use('/login',loginRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
 // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
//});

module.exports = app;
