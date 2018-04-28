var fs = require('fs');
var pg = require ('pg');
const WavesAPI = require('waves-api');
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
const seed_phrase_1 = 'type intact dish action paddle rigid soap happy airport review message donor october unable pulp'
const seed_1 = Waves.Seed.fromExistingPhrase(seed_phrase_1);
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
fs.writeFile('./public/userbase_backup.json', JSON.stringify(userbase), 'utf8',function(err){console.log(err)});
app.get('/', function (req, res) {
  res.sendFile(__dirname +'/views/index.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


app.post('/', function (req, res) {
  console.log(req.body);
})


app.post('/account_config', function(req,res) {
  var user_input = req.body.username
  if (userbase[user_input].account_config) {
    var configs = userbase[user_input].account_config
  } else {
    userbase[user_input].account_config = {}
    configs = userbase[user_input].account_config
  }

  if (req.body.action == 'load') {
    console.log('loading')
    res.send(JSON.stringify({ username: user_input,configs:configs }));
  }
  if (req.body.action == 'push') {
    // userbase[user_input].account_config[]
    console.log(req.body)
  }
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
        seedaddress:req.body.seedaddress,
        seedphrase:req.body.seedphrase,
        account_config:{
          email:'Unconfirmed',
          searchable:true,
          btcaddress:'',
          verified:false,
        },
  }
  fundAccount(req.body.seedaddress,user_input,res)
//  console.log(obj)
//  fs.writeFile('./public/jsonusers.json', JSON.stringify(obj), 'utf8',function(err){console.log(obj)});
  // res.send(JSON.stringify({ usercreated: true }));
  // fs.writeFile('./public/userbase.json', JSON.stringify(userbase), 'utf8',function(err){console.log(user_input+'created')});
})


app.post('/wallet', function (req, res) {
  // if (req.body.unlock == true) {}
  var user_input = req.body.username
  if (userbase[user_input]) {
    var encrypted = userbase[user_input].seedphrase
    console.log(userbase[user_input])
    console.log(encrypted)
    // fundAccount(user_input)

    console.log('Loggin in')
    var address = userbase[user_input].seedaddress
    // Waves.API.Node.v1.addresses.balance(address).then((balance) => {
    //     console.log(balance);
    //     res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted,data:JSON.stringify(balance) }));
    // });
    Waves.API.Node.v1.assets.balances(address).then((balancesList) => {
      console.log('fluubber')
       console.log(balancesList);
       Waves.API.Node.v1.addresses.balance(address).then((balance) => {
           console.log(balance);
           res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted,balance:balance,balances:balancesList,username:user_input }));
       });
       // res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted,balances:JSON.stringify(balancesList) }))
    });
    // res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted }));
  } else {
    res.send(JSON.stringify({ a: false }));
  }

})

app.post('/usercheck', function (req, res) {
  console.log(req.body.username)
  var user_input = req.body.username
  res.setHeader('Content-Type', 'application/json');
  if (userbase[user_input]) {
        console.log('Username taken')
        res.send(JSON.stringify({ a: false }));
  } else {
    console.log(user_input)
    console.log('logging in')
//  console.log(req.body);
//    obj[user_input] = true
//    fs.writeFile('./public/jsonusers.json', JSON.stringify(obj), 'utf8',function(err){console.log(obj)});
//  res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: true }));
  }
})




function fundAccount(address,user_input,res) {
  console.log('FUNDACCOUNT INSIDE')
  var myad_2 = address
  console.log(myad_2)
  const transferData = {

      // An arbitrary address; mine, in this example
      recipient: myad_2,

      // ID of a token, or WAVES
      assetId: 'WAVES',

      // The real amount is the given number divided by 10^(precision of the token)
      // am 1000000000 <- this amount is 10 WAVES
      amount: 100000,

      // The same rules for these two fields
      feeAssetId: 'WAVES',
      fee: 100000,

      // 140 bytes of data (it's allowed to use Uint8Array here)
      attachment: '',

      timestamp: Date.now()

  };

  Waves.API.Node.v1.assets.transfer(transferData, seed_1.keyPair).then((responseData) => {
      console.log(responseData);
      res.send(JSON.stringify({ usercreated: responseData }));
  });
  console.log('Username: '+user_input)
  console.log('Address: '+address)
  console.log('FUNDACCOUNT OUTTING')
}


//var con_string = 'tcp://quikuser:JbT061409@0.0.0.0:5432/quik';
var con_string = 'tcp://quikuser:JbT061409@139.59.208.173:5432/quik';
var pg_client = new pg.Client(con_string);
pg_client.connect();
app.post('/options',function(req,res) {
  if (req.body.query == 'chain') {
    console.log('chain request')
    console.log(req.body)
    var underlyings = req.body.underlyings
    var query_message = 'SELECT * FROM ri_options WHERE '
    underlyings.forEach(function(d,i) {
      query_message = query_message + 'option_base = \''+d+'\''
      if (i < underlyings.length-1) {
        query_message = query_message+' OR '
      }
    })
    console.log(query_message)
    var query = pg_client.query(query_message)
    query.then(function(result) {
        // var prep = result
       console.log('options requested')
       res.send(JSON.stringify({ result }));
       // console.log(result.rows) //will log results.
    })

  }
  if (req.body.query == 'underlying_list') {
    query_message = 'SELECT DISTINCT option_base FROM ri_options;'
    var query = pg_client.query(query_message)
    query.then(function(result) {
        // var prep = result
       console.log('options requested')
       res.send(JSON.stringify({ result }));
       // console.log(result.rows) //will log results.
    })
  }
})




// CLEAN UP AND KILL PROCESS
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    fs.writeFileSync('./public/userbase.json', JSON.stringify(userbase), 'utf8',function(err){console.log(err)});
    console.log('Wrote file at: ./public/userbase.json');

    if (options.cleanup) {
      console.log('cleaning up');
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));





//console.log('im here')
//console.log(query)


//
//
// // ISSUE DATA
//
// const issueData = {
//     name: 'ContractToken',
//     description: 'Represents ownership of contract in transaction attachment',
//     // With given options you'll have 100000.00000 tokens
//     quantity: 10000000000,
//     precision: 0,
//     // This flag defines whether additional emission is possible
//     reissuable: true,
//     fee: 100000000,
//     timestamp: Date.now()
// };
// Waves.API.Node.v1.assets.issue(issueData, seed.keyPair).then((responseData) => {
//     console.log(responseData);
// });
//
//
//
// // TRANSFER DATA
//
// const transferData = {
//
//     // An arbitrary address; mine, in this example
//     recipient: '3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8',
//
//     // ID of a token, or WAVES
//     assetId: 'WAVES',
//
//     // The real amount is the given number divided by 10^(precision of the token)
//     amount: 10000000,
//
//     // The same rules for these two fields
//     feeAssetId: 'WAVES',
//     fee: 100000,
//
//     // 140 bytes of data (it's allowed to use Uint8Array here)
//     attachment: '',
//
//     timestamp: Date.now()
//
// };
//
// Waves.API.Node.v1.assets.transfer(transferData, seed.keyPair).then((responseData) => {
//     console.log(responseData);
// });
//
//
// // REISSUE DATA
// const reissueData = {
//
//     // Asset ID which is to be additionnaly emitted
//     assetId: '5xN8XPkKi7RoYUAT5hNKC26FKCcX6Rj6epASpgFEYZss',
//
//     // Additional quantity is the given number divided by 10^(precision of the token)
//     quantity: 100000000,
//
//     reissuable: false,
//     fee: 100000000,
//     timestamp: Date.now()
//
// };
//
// Waves.API.Node.v1.assets.reissue(reissueData, seed.keyPair).then((responseData) => {
//     console.log(responseData);
// });
//
//
