var fs = require('fs');
var pg = require ('pg');
var request = require('request');
var d3 = require('d3')
// var io = require('socket.io')
const WavesAPI = require('waves-api');
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
const seed_phrase_1 = 'type intact dish action paddle rigid soap happy airport review message donor october unable pulp'
const seed_1 = Waves.Seed.fromExistingPhrase(seed_phrase_1);
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

var Web3 = require('web3');
var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'hair route suffer hood brother virus carbon fall song jewel food upset business reunion pull'
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");
web3 = new Web3(provider)
// '0xe04202f262b79aa24e09f29a3461690efdf63f63'
const ad1 = provider.addresses[0]
console.log(ad1)
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// console.log(seed_1)
bld = require('./build/contracts/Escrow.json')
let abi = bld.abi
let code = bld.bytecode
var SampleContract = new web3.eth.Contract(abi);

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var port = process.env.PORT || 3000;
//
//
// io.on('connection', (socket) => {
//   console.log('a user connected');
//
//   socket.on('disconnect', () => {
//    console.log('user disconnected');
//   });
// });

// var socket = require('socket.io-client')('http://localhost');
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});
const server = require('http').createServer(app)
const io = require('socket.io')(server)

cb = require('./public/contractlog.json')
cb1 = d3.entries(cb)

function sendContract(data) {
  console.log("Deploying the contract");
  var grabba = {
    data:code,
    arguments:[data.buyer,data.seller],
    from:ad1,
    gas:1000000,
    gasPrice:'30000000000',
  }
  // grabba.push({})
  SampleContract.deploy({
    data: code,
    arguments: [data.buyer,data.seller]
  }).send({
    from: ad1,
    gas: 1000000,
    gasPrice: '30000000000'}, function(error, transactionHash){ console.log(error);console.log(transactionHash) })
    .on('error', function(error){
      console.log(error)
      // io.emit('make_escrow',{on:'error',data:error})
      grabba['error'] = error
    })
    .on('transactionHash', function(transactionHash){
      console.log(transactionHash)
      // io.emit('make_escrow',{on:'transactionHash',data:transactionHash})
      grabba['transactionHash'] = transactionHash
    })
    .on('receipt', function(receipt){
      // console.log(receipt.contractAddress)
      io.emit('make_escrow',{on:'receipt',data:receipt})
      grabba['receipt'] = receipt
    })
    .on('confirmation', function(confirmationNumber, receipt){
       // console.log(receipt);
       console.log(confirmationNumber)
       io.emit('make_escrow',{on:'receipt',data:{receipt:receipt,confirmationNumber:confirmationNumber}})
       grabba['confirmation'] = {
         confirmationNumber:confirmationNumber,
         receipt:receipt
       }

       contractlog[receipt.contractAddress] = grabba

     })
    .then(function(newContractInstance){
      var ni = {
        address:newContractInstance.options.address,
        jsonInterface:newContractInstance.options.jsonInterface,
        data:newContractInstance.options.data,
        from:newContractInstance.options.from,
        gasPrice:newContractInstance.options.gasPrice,
        gas:newContractInstance.options.gas,
      }
      grabba['then'] = ni
      contractlog[newContractInstance.options.address] = ni
      io.emit('make_escrow',{on:'then',data:ni})
      console.log('sapisula')


    });
}


// function handleContractResponse(data) {
//
// }


io.on('connection', function (client) {
  client.on('register',function(){
    console.log('register')
  })
  //
  // client.on('join', handleJoin)
  //
  // client.on('leave', handleLeave)
  //
  // client.on('message', handleMessage)
  //
  // client.on('chatrooms', handleGetChatrooms)

  client.on('respond_to_contracts',function(data) {
    console.log('handleContractResponse')
    console.log(data)
    if (contractlog[data.contract]['other']) {
      var m = contractlog[data.contract]['other']
      m.push({
        action:data.action,
        user: data.address,
        date:data.date
      })
      contractlog[data.contract]['other'] = m
      console.log('handleContractResponse appending')
    } else {
      console.log('handleContractResponse new')
      contractlog[data.contract]['other'] = [{
        action:data.action,
        user: data.address,
        date:data.date,
        data:data.data
      },]
    }
    console.log('handleContractResponse End')
    console.log(Object.keys(contractlog[data.contract]))
    io.emit('respond_to_contracts',contractlog[data.contract])
  })
  //
  client.on('invitation', function(a,data){
    console.log(data)
    var sender = data.sender
    // var reciever = data.reciever
    var title = data.title
    var message = data.message
    var qm1 = 'INSERT INTO realtime(sender,reciever,title,message,creation_date) VALUES '
    // var qm2 = 'VALUES (\''+sender+'\',\''+reciever+'\',\''+title+'\',\''+message+'\',current_timestamp)'
    console.log(data.members)
    data.members.forEach(function(d){
      console.log(d)
      var qm2 = '(\''+sender+'\',\''+d+'\',\''+title+'\',\''+message+'\',current_timestamp),'
      qm1 = qm1 + qm2
    })
    qm1 = qm1.slice(0,-1)
    console.log(qm1)
    // io.emit('invitation','pixa');

    var query = pg_client.query(qm1)
    query.then(function(result){
      console.log(result)
      io.emit('invitation',data.members);
    }).catch(function(err){console.log(err)})
  })

  client.on('respondinvites',function(data){
    var id = data.id
    var action = data.action
    var qm = 'UPDATE realtime SET actions = \'["'+action+'"]\'::jsonb WHERE id='+id+';'
    console.log('respondinvites')
    console.log(qm)
    var query = pg_client.query(qm)
    query.then(function(result) {
      console.log(result)
      io.emit('respondinvites',{id:id,action:action,success:true})
    }).catch(function(err) {
      console.log(err)
      io.emit('respondinvites','error...')
    })
    if (action == 'confirm') {
      var user_input = data.username
      var neworg = data.organization
      var qm = 'UPDATE userbase SET organization = (CASE WHEN organization IS NULL THEN \'[]\'::JSONB ELSE organization END) || \'["'+neworg+'"]\'::JSONB WHERE username = \''+user_input+'\';'
      var query = pg_client.query(qm)
      query.then(function(result) {
        console.log(qm)
        console.log(result)
        io.emit('notifications','added '+user_input+' to '+neworg)
      }).catch(function(err){console.log(err)})

      var qm = 'UPDATE organizationbase SET members = jsonb_set(members::jsonb,array[\'joined\'],(members->\'joined\')::jsonb ||\'["'+user_input+'"]\'::jsonb) WHERE username = \''+neworg+'\';'
      var query = pg_client.query(qm)
      query.then(function(result) {
        console.log(result)
        console.log(qm)
      }).catch(function(err){console.log(err)})
    }
    if (action == 'dismiss') {
      var user_input = data.username
      var neworg = data.organization
      // var qm = 'UPDATE userbase SET organization = (CASE WHEN organization IS NULL THEN \'[]\'::JSONB ELSE organization END) || \'["'+neworg+'"]\'::JSONB WHERE username = \''+user_input+'\';'
      // var query = pg_client.query(qm)
      // query.then(function(result) {
        // console.log(qm)
        // console.log(result)
        // io.emit('notifications','added '+user_input+' to '+neworg)
      // }).catch(function(err){console.log(err)})

      var qm = 'UPDATE organizationbase SET members = jsonb_set(members::jsonb,array[\'declined\'],(members->\'declined\')::jsonb ||\'["'+user_input+'"]\'::jsonb) WHERE username = \''+neworg+'\';'
      var query = pg_client.query(qm)
      query.then(function(result) {
        console.log(result)
        console.log(qm)
      }).catch(function(err){console.log(err)})
    }



  })

  client.on('getinvites',function(data) {
    var user_input = data
    console.log(data + 'getinvites')
    var qm = 'SELECT * FROM realtime WHERE reciever = \''+user_input+'\' OR sender = \''+user_input+'\';'
    var query = pg_client.query(qm)
    query.then(function(result) {
      var datums = result.rows
      io.emit('getinvites',datums)
      console.log(result.rows)
    }).catch(function(err){console.log(err)})
  })

  client.on('btctx',function(data) {
    console.log('btctx')
    console.log(data)
    var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
    // var newtx = {
    //   "inputs": [{"addresses": ["mr3wnUgRxJpEZPiHik2WHJdGDgqWtvuESn"]}],
    //   "outputs": [{"addresses": ["n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD"], "value": 1000}]
    // }
    request({
        url:rootUrl+"/txs/new",
        method: "POST",
        json: true,   // <--Very important!!!
        body: data
    }, function (error, response, body){
        console.log(response);
        io.emit('btctx',response)
    });

  })

  client.on('btctxpush',function(data) {
    console.log('btctxpush')
    var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
    request({
        url:rootUrl+"/txs/send",
        method: "POST",
        json: true,   // <--Very important!!!
        body: data
    }, function (error, response, body){
        console.log(response);
        io.emit('btctxpush',response)
    });
  })

  client.on('make_escrow',function(data) {
    sendContract(data)
  })

  client.on('getcontracts',function(data){
    var ad = data.address
    // ad = '0x64983b2b62ffb471c6c8f35d45390f0e5c8fc67e'
    contracts = []
    var mask = {}
    cb1.forEach(function(d){
      var a = d.value.arguments[0]
      var b = d.value.arguments[1]
      if (a == ad || b == ad) {
        mask[a] = clientmask.eth[a]
        mask[b] = clientmask.eth[b]
        var dancy = {
          a:d.value.arguments[0],
          b:d.value.arguments[1],
          then:d.value.then,
          other:d.value.other,
          thash:d.value.transactionHash
        }
        contracts.push(dancy)
      }

    })
    io.emit('getcontracts',{contracts:contracts,abi:abi,mask:mask})
    console.log(contracts)
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen(8080, function (err) {
  if (err) throw err
  console.log('server listening on port 8080')
})








// var con_string = 'tcp://juanbernardotobar:@0.0.0.0:5432/thechain'
var con_string = 'tcp://thechainuser:th3ch@1nUz3r@139.59.208.173:5432/thechain'
var pg_client = new pg.Client(con_string);
try {
  pg_client.connect().then(console.log('Connected to: '+con_string));
} catch(err) {
  var con_string = 'tcp://thechainuser:th3ch@1nUz3r@0.0.0.0:5432/thechain'
  var pg_client = new pg.Client(con_string);
  pg_client.connect().then(console.log('Connected to: '+con_string));
}

var intro_query_message = 'SELECT current_database();'

var clientmask = {
  btc:{},
  eth:{},
  wav:{},
  username:{}
}
function clientmasks() {
  var qm = 'SELECT username,address,btcaddress,ethaddress FROM userbase;'
  var query = pg_client.query(qm)
  query.then(function(result){
    var data = result.rows
    data.forEach(function(d){
      clientmask.wav[d.address] = d.username
      clientmask.eth[d.ethaddress] =  d.username
      clientmask.btc[d.btcaddress] = d.username
      clientmask.username[d.username] = {
        wav:d.address,
        eth:d.ethaddress,
        btc:d.btcaddress,
      }

    })
    console.log('clientmasked')
    console.log(clientmask)
  }).catch(function(err){console.log(err)})
}
clientmasks()

var intro_query = pg_client.query(intro_query_message)
var users = []
intro_query.then(function(result) {
   console.log('DB NAME')
   console.log(result.rows)
}).catch(function(err){console.log(err)})
var intro_query_message = 'SELECT username FROM userbase;'
var intro_query = pg_client.query(intro_query_message)
intro_query.then(function(result) {
   console.log('userbase:')
   // console.log(result.rows)
   result.rows.forEach(function(d){users.push(d.username)})
   console.log(users)
}).catch(function(err){console.log(err)})

var intro_query_message = 'SELECT COUNT(*) FROM txbase;'
var intro_query = pg_client.query(intro_query_message)
var transaction_count
intro_query.then(function(result) {
  console.log('TX BASE')
  transaction_count = Number(result.rows[0].count)
   console.log(transaction_count)
}).catch(function(err){console.log(err)})






// var pg_client = new pg.Client(con_string);
// pg_client.connect();


// var query = pg_client.query('LISTEN addedrecord');
//
// io.sockets.on('connection', function (socket) {
//     socket.emit('connected', { connected: true });
//     console.log('connected')
//     socket.on('ready for data', function (data) {
//       console.log('ready for data')
//         pg_client.on('notification', function(title) {
//           console.log('notification')
//             socket.emit('update', { message: title });
//         });
//     });
// });



// var transaction_count = ''
// console.log('crypsario')
// var user_input = 'pulanga'
// var encrypted = 'cryptsaio'
// var insert_body = {
//       seedaddress:'req.body.seedaddress',
//       encrypted:'req.body.seedphrase',
//       account_config:{
//         email:'Unconfirmed',
//         searchable:'true',
//         btcaddress:'',
//         verified:'false',
//         account_name:'',
//       },
// }
//
// var qm1 = "INSERT INTO userbase(username,passphrase,creation_date,body) "
// var qm2 = "VALUES (\'"+user_input+"\',\'"+encrypted+"\',current_timestamp,  \'"+JSON.stringify(insert_body)+"\');"
// var query_message = qm1+qm2
// console.log(query_message)
// var query = pg_client.query(query_message)
// query.then(function(result) {
//     // var prep = result
//    console.log('options requested')
//    console.log(result)
//    // fundAccount(insert_body,user_input,res)
//    // res.send(JSON.stringify({ result }));
//    // console.log(result.rows) //will log results.
// })
// var qm1 = "INSERT INTO userbase(username,passphrase,creation_date,body) "
// var qm2 = "VALUES (username,encrypted,current_timestamp,  fdfds);"
// var query = pg_client.query(query_message)
// query.then(function(result) {
//     // var prep = result
//    console.log('options requested')
//    res.send(JSON.stringify({ result }));
//    // console.log(result.rows) //will log results.
// })


app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(function (err, req, res, next) {
//  console.error(err.stack)
//  res.status(500).send('Something broke!')
//})

//var obj = require(__dirname+"/public/jsonusers.json");
//var obj = require('./public/jsonusers.json');
var contractlog = require('./public/contractlog.json');
cl = d3.entries(contractlog)

var ad = ''
supa = cl.map(function(d){
  a1 = d.value.arguments[0]
  a2 = d.value.arguments[1]
  if (a1 ==ad || a2 == ad) {
    b = d.value.receipt.contractAddress
    return b
  }})

// var contractlog = {}
// fs.writeFile('./public/userbase_backup.json', JSON.stringify(userbase), 'utf8',function(err){console.log(err)});
app.get('/', function (req, res) {
  res.sendFile(__dirname +'/views/index.html')
})

//app.listen(8080, function () {
//  console.log('App listening on port 8080!')
//})


app.post('/', function (req, res) {
  console.log(req.body);
})
var stripe = require("stripe")("sk_test_p8QZekzhhTh8YiktfyPsoT2S");
app.post('/payment',function(request,response){

console.log('payment')
console.log(request)
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
const token = request.body.stripeToken; // Using Express

const charge = stripe.charges.create({
  amount: 999,
  currency: 'usd',
  description: 'Example charge',
  source: token,
});
response.json(200)
// res.send(JSON.stringify({ what:'transaction'}));
})


app.post('/sendtransaction', function(req,res) {
  console.log('sendtransaction')
  console.log(req.body)
  console.log(req.body.username)
  var recipient = req.body.formdata.recipient
  var qm = 'SELECT * FROM userbase WHERE username = \''+recipient+'\''
  console.log(qm)
  var query = pg_client.query(qm)
  query.then(function(result) {
    console.log(result.rows)
    if (result.rows.length != 0) {
      var recipient_conf = result.rows[0].body
      var searchable = recipient_conf.searchable
      var account_name = recipient_conf.account_name
      var recipient_address = result.rows[0].address
      console.log('RECIPIENT')
      console.log(result.rows[0].body)
      res.send(JSON.stringify({ account_name:account_name,recipient_address:recipient_address}));
    } else {
      res.send(JSON.stringify({ account_name:0}));
    }
  }).catch(function(err){console.log(err)})

  // res.send(JSON.stringify({ what:'transaction'}));
})

app.post('/ua_mask',function(req,res) {
  // USER MASK
  var qm1 = ''
  req.body.ua_mask.forEach(function(d){
    qm1 = qm1+'\''+d+'\','
  })
  qm1 = qm1.slice(0,-1)
  var qm = 'SELECT username,address FROM userbase WHERE address in ('+qm1+')'
  console.log(qm)
  console.log(req.body)
  var query = pg_client.query(qm)
  // TRANSACTION MASK
  var qm2 = ''
  req.body.transaction_mask.forEach(function(d){
    qm2 = qm2+'\''+d+'\','
  })
  qm2 = qm2.slice(0,-1)
  var qm2 = 'SELECT id,transactionid FROM txbase WHERE transactionid in ('+qm2+')'
  console.log(qm2)
  var query2 = pg_client.query(qm2)

  query.then(function(result){
    var rows = result.rows
    query2.then(function(result2) {
      var rows2 = result2.rows
      res.send(JSON.stringify({rows:rows,rows2:rows2}))
      console.log({rows:rows,rows2:rows2})
      console.log('SENT')
    }).catch(function(err){console.log(err)})
  }).catch(function(err){console.log(err)})

})


app.post('/log_tx',function(req,res){
  var txData = req.body.txData
  var transactionid = txData.id
  console.log(txData)
  var transactionid = txData.id
  var qm1 = "INSERT INTO txbase(transactionid,body,creation_date) "
  var qm2 = "VALUES (\'"+transactionid+"\',\'"+JSON.stringify(txData)+"\',current_timestamp);"
  var query_message = qm1+qm2
  // var query_message = 'SELECT current_database();'
  // toDB(query_message)
  var query = pg_client.query(query_message)
  console.log(query_message)
  query.then(function(result){
    console.log(result)
    transaction_count = transaction_count+1
    res.send(JSON.stringify({id:transaction_count}))
    console.log('transaction COUNT')
    console.log(transaction_count)
  }).catch(function(err){console.log(err)})

})

function sendInvitations(arg) {
  // var members = req.body.members
  var members = []
  arg.forEach(function(d){
    members.push(d.value)
  })
  console.log(members)
  // console.

}


app.post('/make_org', function(req,res) {
  var user_input = req.body.user
  console.log('MAKE ORG')
  console.log(req.body)
  var qm = 'INSERT INTO organizationbase(username,name,owners,members,body,creation_date) VALUES ('
  qm = qm+'\''+req.body.form_dict.organization_username+'\','
  qm = qm+'\''+req.body.form_dict.organization_name+'\','
  qm = qm +'\''+JSON.stringify({owner:req.body.user})+'\','
  try {
    console.log(req.body.members.length+' Members')
    qm = qm +'\''+JSON.stringify({invited:req.body.members,joined:['testuser'],declined:[]})+'\','
    sendInvitations(req.body.members)
  } catch(err) {
    qm = qm +'\''+JSON.stringify({'member_1':user_input})+'\','
  }
  var description = {organization_description:req.body.form_dict.organization_description}
  qm = qm +'\''+JSON.stringify(description)+'\','
  qm = qm+'current_timestamp)'
  console.log(qm)
  var query = pg_client.query(qm)
  query.then(function(result){
    console.log('MAKE ORG RESULT FROM QUERY')
    console.log(result)
    // res.send(JSON.stringify({sup:result.command}))
    var neworg = req.body.form_dict.organization_username
    var qm = 'UPDATE userbase SET organization = (CASE WHEN organization IS NULL THEN \'[]\'::JSONB ELSE organization END) || \'["'+neworg+'"]\'::JSONB WHERE username = \''+user_input+'\';'
    console.log(qm)
    var query = pg_client.query(qm)
    query.then(function(result2){
      console.log(result2)
      res.send(JSON.stringify({sup:result.command,dup:result2.command}))
    }).catch(function(err){console.log(err)})
  }).catch(function(err){console.log(err)})

  // var user_input = 'dalio'
  // var neworg = req.body.form_dict.organization_username
  // var qm = 'UPDATE userbase SET organization = (CASE WHEN organization IS NULL THEN \'[]\'::JSONB ELSE organization END) || \'["'+neworg+'"]\'::JSONB WHERE username = \''+user_input+'\';'
  // console.log(qm)
  // var query = pg_client(qm)
  // query.then(function(result2){
  //   //
  // }).catch(function(err){console.log(err)})

})

app.post('/confirm_ua', function(req,res){
  console.log('function by Ena')
  var address = req.body.address
  var qm = 'SELECT username FROM userbase WHERE address = \'' + address + '\''
  var query = pg_client.query(qm)
  query.then(function(result){
      console.log(result.rows)
      res.send(JSON.stringify({ recipient:result.rows}))
  })

})


app.post('/account_config', function(req,res) {
  var user_input = req.body.username
  var query_message = "SELECT * FROM userbase WHERE username = '"+user_input+"'";
  var query = pg_client.query(query_message)
  query.then(function(result) {
    var configs = result.rows[0].body
    console.log('config1')
    console.log(configs)
    if (req.body.action == 'load') {
      console.log('loading')
      res.send(JSON.stringify({ username: user_input,configs:configs }));
    }
    if (req.body.action == 'push') {
      // userbase[user_input].account_config[]
      console.log('pushed')
      console.log(req.body)
      req.body.updates.forEach(function(d) {
        console.log(d)
        configs[d] = req.body.account_config[d]
        console.log('The below was updated')

        // console.log(userbase[user_input])
      })
      console.log(configs)
      // UPDATE userbase SET body = '{"funka":"funner"}' WHERE username='user';
      var qm = "UPDATE userbase SET body = '"+JSON.stringify(configs)+"' WHERE username='"+user_input+"';"
      var query = pg_client.query(qm)
      query.then(function(result) {
        console.log('updating')
        console.log(user_input)
        console.log(result)
        res.send(JSON.stringify({ updated: configs,result:result}));
      }).catch(function(err){console.log(err)})

    }
  }).catch(function(err){console.log(err)})
})

// function toDB(query_message) {
//   var query = pg_client.query(query_message).catch(function(error){console.log(error)})
//   query.then(function(result) {
//       // var prep = result
//      console.log('options requested')
//      console.log(result)
//      // fundAccount(insert_body,user_input,res)
//      res.send(JSON.stringify({ result }));
//      // console.log(result.rows) //will log results.
//   }).catch(function(error){console.log(error)})
// }



app.post('/usercreation', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log('usercreation');
  var user_input = req.body.username
  console.log(req.body)
//  obj[user_input] = true
  var encrypted = req.body.seedphrase
  var ethaddress = req.body.ethaddress
  var insert_body = {
        seedaddress:req.body.seedaddress,
        ethaddress: req.body.ethaddress,
        encrypted:req.body.seedphrase,
        account_config:{
          email:'Unconfirmed',
          searchable:'true',
          btcaddress:'',
          verified:'false',
          account_name:'',
        },
  }
  var qm1 = "INSERT INTO userbase(username,passphrase,address,ethaddress,creation_date,body) "
  var qm2 = "VALUES (\'"+user_input+"\',\'"+encrypted+"\',\'"+req.body.seedaddress+"\',\'"+ethaddress+"\',current_timestamp,  \'"+JSON.stringify(insert_body)+"\');"
  var query_message = qm1+qm2
  // var query_message = 'SELECT current_database();'
  // toDB(query_message)
  var query = pg_client.query(query_message).catch(function(error){console.log(error)})
  query.then(function(result) {
      // var prep = result
     console.log('options requested')
     console.log(result)
     fundAccount(insert_body,user_input,res)
     fundAccountEth(ethaddress)
     // res.send(JSON.stringify({ result }));
     // console.log(result.rows) //will log results.
  }).catch(function(error){console.log(error)})
})

function fundAccountEth(ethaddress) {
  console.log('about to fund ether,\nFROM:'+ad1+'\n  TO:'+ethaddress)
  web3.eth.sendTransaction({from:ad1,to:ethaddress,value:100}).then(function(d){
    console.log(d)
    console.log('FUNDED,\nFROM:'+ad1+'\n  TO:'+ethaddress)
    io.emit('notification_with_data',{message:'Your account has been funded with ETH',data:d,action:'ETH'})
  })

}

function fundAccount(insert_body,user_input,res) {
  // var ethaddress = ethaddress
  console.log('FUNDACCOUNT INSIDE')
  var myad_2 = insert_body.seedaddress
  console.log(myad_2)
  const transferData = {

      // An arbitrary address; mine, in this example
      recipient: myad_2,

      // ID of a token, or WAVES
      assetId: 'WAVES',

      // The real amount is the given number divided by 10^(precision of the token)
      // am 1000000000 <- this amount is 10 WAVES
      amount: 1000000,

      // The same rules for these two fields
      feeAssetId: 'WAVES',
      fee: 100000,

      // 140 bytes of data (it's allowed to use Uint8Array here)
      attachment: '',

      timestamp: Date.now()

  };
  faucet(myad_2)
  try {
    Waves.API.Node.v1.assets.transfer(transferData, seed_1.keyPair).then((responseData) => {
        console.log(responseData);
        res.send(JSON.stringify({ usercreated: responseData,insert_body:insert_body,username:user_input }));
    });
    console.log('Username: '+user_input)
    console.log('Address: '+myad_2)
    console.log('FUNDACCOUNT OUTTING')
  } catch(err) {
    console.log('fundAccount error')
    console.log(err)
  }
}

var usd_id = 'FPGVxbpCePWaRXYy6CEuygM3rQaAR3WN51Xy7q978qZK'
var rub_id = 'HNfBr9j2QfEgDQR6mE2LVLeQUy4aHRPGHscpZqtzbCzd'

function faucet(myad_2) {
  const transferData = {
      // An arbitrary address; mine, in this example
      recipient: myad_2,
      // ID of a token, or WAVES
      assetId: usd_id,
      // The real amount is the given number divided by 10^(precision of the token)
      // am 1000000000 <- this amount is 10 WAVES
      amount: 50,
      // The same rules for these two fields
      feeAssetId: 'WAVES',
      fee: 100000,
      // 140 bytes of data (it's allowed to use Uint8Array here)
      attachment: '',
      timestamp: Date.now()
  };
  Waves.API.Node.v1.assets.transfer(transferData, seed_1.keyPair).then((responseData) => {
    console.log('USD TRANSFER DONE')
    const transferData2 = {
        // An arbitrary address; mine, in this example
        recipient: myad_2,
        // ID of a token, or WAVES
        assetId: rub_id,
        // The real amount is the given number divided by 10^(precision of the token)
        // am 1000000000 <- this amount is 10 WAVES
        amount: 1000,
        // The same rules for these two fields
        feeAssetId: 'WAVES',
        fee: 100000,
        // 140 bytes of data (it's allowed to use Uint8Array here)
        attachment: '',
        timestamp: Date.now()
    };
    Waves.API.Node.v1.assets.transfer(transferData2, seed_1.keyPair).then((responseData2) => {
        console.log(responseData2);
        console.log('RUB TRANSFER DONE')
        io.emit('notification_with_data',{message:'Your account has been funded with USD and RUB',data:[responseData,responseData2],action:'WAV'})
    }).catch(function(err){console.log(err)});
  }).catch(function(err){console.log(err)});
}


app.post('/wallet', function (req, res) {
  // if (req.body.unlock == true) {}
  var user_input = req.body.username

  // if (userbase[user_input]) {
  var qm = 'SELECT username FROM userbase'
  var query = pg_client.query(qm)
  var users = []
  query.then(function(result) {
     result.rows.forEach(function(d){users.push(d.username)})
     if (users.includes(user_input) ) {
       // var query_message = "SELECT * FROM userbase WHERE username = 'testuser'";
       var query_message = "SELECT * FROM userbase WHERE username = '"+user_input+"'";
       var query = pg_client.query(query_message)
       query.then(function(result) {
          console.log(user_input)
          console.log(result.rows)

          var encrypted = result.rows[0].passphrase
          console.log(result.rows[0])
          console.log(encrypted)
          // fundAccount(user_input)

          console.log('Loggin in')
          var address = result.rows[0].address
          var account_config = result.rows[0].body
          // Waves.API.Node.v1.addresses.balance(address).then((balance) => {
          //     console.log(balance);
          //     res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted,data:JSON.stringify(balance) }));
          // });
          Waves.API.Node.v1.assets.balances(address).then((balancesList) => {
            console.log('fluubber')
             console.log(balancesList);
             Waves.API.Node.v1.addresses.balance(address).then((balance) => {
                 console.log(balance);
                 console.log(account_config)
                 res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted,balance:balance,balances:balancesList,username:user_input,account_config:account_config }));
             }).catch(function(err){
               console.log(err)
               res.send(JSON.stringify({ a: err }));
             });
             // res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted,balances:JSON.stringify(balancesList) }))
          }).catch(function(err){
            console.log(err)
            res.send(JSON.stringify({ a: err }));
          });
       }).catch(function(err){console.log(err)})

       // res.send(JSON.stringify({ a: 'wallet', encrypted:encrypted }));
     } else {
       res.send(JSON.stringify({ a: false }));
     }

   })
})

app.post('/usercheckwaddress', function (req, res) {
  console.log(req.body.username)
  console.log('usercheckwaddress')
  console.log(req.body)
  var user_input = req.body.username
  res.setHeader('Content-Type', 'application/json');
  if (req.body.what == 'WAV') {
    var qm = 'SELECT address from userbase a where username = \''+user_input+'\';'
  }
  if (req.body.what == 'ETH') {
    var qm = 'SELECT ethaddress from userbase a where username = \''+user_input+'\';'
  }
  if (req.body.what == 'BTC') {
    var qm = 'SELECT btcaddress from userbase a where username = \''+user_input+'\';'
  }
  // console.log(qm)
  // var qm = 'SELECT username FROM userbase'
  var query = pg_client.query(qm)
  query.then(function(result) {
    // console.log(result)
    if (result.rows.length != 0) {
      console.log('Username taken')
      res.send(JSON.stringify({ a: false,data:result.rows[0],username:user_input}));
    } else {
      res.send(JSON.stringify({ a: true }));
    }
  }).catch(function(err){console.log(err)})
})



app.post('/usercheck', function (req, res) {
  console.log(req.body.username)
  var user_input = req.body.username
  res.setHeader('Content-Type', 'application/json');
  // var qm1 = 'SELECT userbase.username,organizationbase.username FROM userbase,organizationbase '
  // var qm = qm1 +'WHERE userbase.username=\''+user_input+'\' OR organizationbase.username = \''+user_input+'\';'
  var qm = 'select 1 from (select username as username from userbase union all select username from organizationbase ) a where username = \''+user_input+'\';'
  // console.log(qm)
  // var qm = 'SELECT username FROM userbase'
  var query = pg_client.query(qm)
  query.then(function(result) {
    console.log(result)
    if (result.rows.length != 0) {
      console.log('Username taken')
      res.send(JSON.stringify({ a: false }));
    } else {
      res.send(JSON.stringify({ a: true }));
    }
  }).catch(function(err){console.log(err)})
  // var users = []
  // query.then(function(result) {
  //    result.rows.forEach(function(d){users.push(d.username)})
  //    console.log(result.rows)
  //    if (users.includes(user_input) ) {
  //    // if (userbase[user_input]) {
  //          console.log('Username taken')
  //          res.send(JSON.stringify({ a: false }));
  //    } else {
  //      console.log(user_input)
  //      console.log('logging in')
  //      res.send(JSON.stringify({ a: true }));
  //    }
  // }).catch(function(err){console.log(err)})
})


// app.post('/orgcheck',function(req,res){
//   console.log(req.body.username)
//   var user_input = req.body.username
//   var qm = 'SELECT username FROM userbase'
//   var query = pg_client.query(qm)
//   var users = []
//   query.then(function(result){
//     result.rows.forEach(function(d){users.push(d.username)})
//     if (users.includes(user_input)) {
//       console.log('Organization Username taken')
//       res.send(JSON.stringify({ a: false }));
//     }
//   }).catch(function(err){console.log(err)})
// })



//var con_string = 'tcp://quikuser:JbT061409@0.0.0.0:5432/quik';
// var con_string = 'tcp://quikuser:JbT061409@139.59.208.173:5432/quik';
// var pg_client = new pg.Client(con_string);
// pg_client.connect();
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



app.post('/myorgs',function(req,res){
  var user_input = req.body.username
  console.log(user_input)
  if (req.body.action == 'load') {
    // var qm = 'SELECT * FROM organizationbase WHERE username = \''+user_input+'\''
    var qm = 'SELECT organization FROM userbase WHERE username=\''+user_input+'\';'
    var query = pg_client.query(qm)
    query.then(function(result) {
      var orgs = result.rows[0].organization
      console.log(orgs)
      var qm1 = ''
      orgs.forEach(function(d){
        qm1 = qm1+'\''+d+'\','
      })
      qm1 = qm1.slice(0,-1)
      var qm = 'SELECT * FROM organizationbase WHERE username in ('+qm1+')'
      var query = pg_client.query(qm)
      query.then(function(result2){
        console.log(result2.rows)
        res.send(JSON.stringify({result:result.rows,result2:result2.rows}))
      }).catch(function(err){console.log(err)})
    }).catch(function(err){console.log(err)})
  }
})




// CLEAN UP AND KILL PROCESS
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    fs.writeFileSync('./public/contractlog.json', JSON.stringify(contractlog), 'utf8',function(err){console.log(err)});
    // console.log('Wrote file at: ./public/userbase.json');

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
