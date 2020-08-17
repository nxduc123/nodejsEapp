var express =require('express');
var path =require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
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
    res.send('working')
})

//start the server
var port = 3000;
app.listen(port, function(){
    console.log('server run on port ' + port)
})
