var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var check = require('./api/check');
app.use('/check', check);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// API CLASSES - PATH DEFINE TO MAKE IS USABLE
var usersApiResponses = require('./api/usersApiResponses');
var userContactsApiResponses = require('./api/userContactsApiResponses');
var groupsApiResponses = require('./api/groupsApiResponses');
var userSentMessagesApiResponses    =   require("./api/userSentMessagesApiResponses")

// API CLASSES - INCLUDING IN APP
app.use('/user', usersApiResponses);
app.use('/userContact', userContactsApiResponses);
app.use('/group', groupsApiResponses);
app.use("/userSentMessage",userSentMessagesApiResponses);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use('/groups', require('app/api/groupsApiResponses'))

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/check', function(request, response) {
  response.send({is_executed:true,
    path:__dirname+'/api/groupsApiResponses/check1'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});