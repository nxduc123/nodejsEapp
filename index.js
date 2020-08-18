var express =require('express');
var path =require('path');
var mongoose = require('mongoose');
var config = require('./config/config');


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

app.get('/', function(req, res){
    res.render('index',
    {title:'Home'})
})

//start the server
app.listen(config.port, function(){
    console.log('server run on port ' + config.port)
})
