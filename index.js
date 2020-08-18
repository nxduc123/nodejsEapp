var express =require('express');
var path =require('path');
var mongoose = require('mongoose');
var config = require('./config/config');
var bodyParser = require('body-parser');
var session = require('express-session')
var expressValidator = require('express-validator')
// connect to db
mongoose.connect(config.database,{ useNewUrlParser: true , useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connect to db ok ')
})
//init app
var app = express();
//vew angine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
//set public folder
app.use(express.static(path.join(__dirname, 'public')));
// set global error variable
app.locals.errors = null;
// Body Parser middware
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//app session middware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
// app validator middware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
    
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']'; 
    }
    return {
        param : formParam,
        msg : msg,
        value : value
    };
 }
}));
// express messsages

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//set router
var pages = require('./router/pages')
var Adminpages = require('./router/admin_pages.js')
app.use('/admin/pages', Adminpages)
app.use('/', pages)
//start the server
app.listen(config.port, function(){
    console.log('server run on port ' + config.port)
})
