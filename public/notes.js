var parsedJSON = require('/public/userbase.json');

var express = require("express");
var app = express();
var http = require('http');

var massive = require("massive");
var connectionString = "postgres://:@localhost/massive";

var db = massive.connectSync({connectionString : connectionString});

for(i = 0; i < parsedJSON.posts.length; i++) {
	db.saveDoc("posts", parsedJSON.posts[i], function(err,res){});
};
/////////////////////

var pg = require ('pg');
// var parsedJSON = require('./public/userbase.json');

//var con_string = 'tcp://quikuser:JbT061409@0.0.0.0:5432/quik';
// var con_string = 'tcp://quikuser:JbT061409@139.59.208.173:5432/quik';

var con_string = 'tcp://juanbernardotobar:@0.0.0.0:5432/thechain'

try {
  var pg_client = new pg.Client(con_string);
  pg_client.connect().then(console.log('did it'));
} catch(err) {
  console.log('error')
  console.log(err)
}


var query = pg_client.query('INSERT INTO userbase VALUES '+parsedJSON.toString()+';')

var query = pg_client.query('LISTEN addedrecord');
// var query = pg_client.query('SELECT id FROM ri_options')
//console.log('im here')
//console.log(query)
query.then(function(result) {
   console.log(result.rows) //will log results.
})






muna = { exists: true,
     username: 'testuser',
     seedaddress: '3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm',
     seedphrase: 'U2FsdGVkX1+wkQMWy7VKFsOzMmv2by7yZa1+TFaPklgb/uXPQBL1VcnZ1guxlDdH1WoLVYacUd/I4F1qfyM7+Ges86olA0yTg1roffLXQLg/vnHfdQ6qPvETCDsXGnYIO8o3iNPqwYBmpJJs1kM6UzRqNgmdMpoDrMs1frs4vU0=',
     account_config: { email: 'yes@yesno.com', searchable: 'false' } }
