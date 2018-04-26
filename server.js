var fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()


app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(function (err, req, res, next) {
//  console.error(err.stack)
//  res.status(500).send('Something broke!')
//})

//var obj = require(__dirname+"/public/jsonusers.json");
//var obj = require('./public/jsonusers.json');
var userbase = require('./public/userbase.json');

app.get('/', function (req, res) {
  res.sendFile(__dirname +'/views/index.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


app.post('/', function (req, res) {
  console.log(req.body);
})


app.post('/usercreation', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log('usercreation');
  var user_input = req.body.username
  console.log(req.body)
//  obj[user_input] = true
  userbase[user_input] = {
        exists:true,
        username:user_input,
        seed_address:req.body.seed_address,
        seed_phrase:req.body.seed_phrase,
  }
//  console.log(obj)
//  fs.writeFile('./public/jsonusers.json', JSON.stringify(obj), 'utf8',function(err){console.log(obj)});
  res.send(JSON.stringify({ usercreated: true }));
  fs.writeFile('./public/userbase.json', JSON.stringify(userbase), 'utf8',function(err){console.log(user_input+'created')});
})


app.post('/usercheck', function (req, res) {
  console.log(req.body.username)
  var user_input = req.body.username
  res.setHeader('Content-Type', 'application/json');
  if (userbase[user_input]) {
        console.log('Username taken')
        res.send(JSON.stringify({ a: false }));
  } else {
//  console.log(req.body);
//    obj[user_input] = true
//    fs.writeFile('./public/jsonusers.json', JSON.stringify(obj), 'utf8',function(err){console.log(obj)});
//  res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: true }));
  }
})
