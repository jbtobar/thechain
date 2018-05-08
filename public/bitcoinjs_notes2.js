var bitcoin = require("bitcoinjs-lib");
var bigi    = require("bigi");
var buffer  = require('buffer');

var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
// please do not drain our test account, if you need testnet BTC use a faucet
// https://tpfaucet.appspot.com/

$.get(rootUrl+'/addrs/n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD/balance')
  .then(function(d) {console.log(d)});

  $.get(rootUrl+'/addrs/mr3wnUgRxJpEZPiHik2WHJdGDgqWtvuESn/balance').then(function(d) {console.log(d)});

kp = BTCK(seed.phrase,'test')
var address = kp.getAddress()
var priv = kp.toWIF()
var publ = kp.getPublicKeyBuffer().toString('hex')
// console.log(`Public: ${publicKey} \n Private: ${privateKey}`)


var source = {
  private : priv,
  public  : publ,
  address : address
}
// var key   = new bitcoin.ECKey(bigi.fromHex(source.private), true);
var key = kp
var dest  = 'n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD';

// 0. We get a newly generated address
// function logAddr(addr) {
//   dest = addr;
//   log("Generated new address " + dest.address)
// }
var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
request.post(
    rootUrl+"/txs/new",
    data,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            io.emit('btctx',body)
        }
    }
);
// 1. Post our simple transaction information to get back the fully built transaction,
//    includes fees when required.
request.post(
    rootUrl+"/txs/new",
    newtx,
    function(err,res,bod){
      // console.log(err)
      // console.log(res)
      console.log(bod)

    });

var myJSONObject = { ... };
request({
    url:rootUrl+"/txs/new",
    method: "POST",
    json: true,   // <--Very important!!!
    body: newtx
}, function (error, response, body){
    console.log(response);
});

var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
function newTransaction(from,to,val) {

  var newtx = {
    "inputs": [{"addresses": [from]}],
    "outputs": [{"addresses": [to], "value": val}]
  }
  socket.emit('btctx',newtx)

}

// 2. Sign the hexadecimal strings returned with the fully built transaction and include
//    the source public address.
function signAndSend(newtx) {
  if (checkError(newtx)) return;

  newtx.pubkeys     = [];
  newtx.signatures  = newtx.tosign.map(function(tosign) {
    newtx.pubkeys.push(source.public);
    return key.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
  });
  return $.post(rootUrl+"/txs/send", JSON.stringify(newtx)).then(function(d){
    console.log(d);
    window.sas = d
  });
}

function signSend(newtx) {
  if (checkError(newtx)) return;
  newtx.pubkeys     = [];
  newtx.signatures  = newtx.tosign.map(function(tosign) {
    newtx.pubkeys.push(source.public);
    return key.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
  });
  socket.emit('btctxpush',newtx)
}


var myJSONObject = { ... };
request({
    url:rootUrl+"/txs/send",
    method: "POST",
    json: true,   // <--Very important!!!
    body: data
}, function (error, response, body){
    console.log(response);
    io.emit('btctxpush',response)
});


// 3. Open a websocket to wait for confirmation the transaction has been accepted in a block.
function waitForConfirmation(finaltx) {
  if (checkError(finaltx)) return;
  log("Transaction " + finaltx.tx.hash + " to " + dest + " of " +
        finaltx.tx.outputs[0].value/100000000 + " BTC sent.");

  var ws = new WebSocket("wss://socket.blockcypher.com/v1/btc/test3");

  // We keep pinging on a timer to keep the websocket alive
  var ping = pinger(ws);

  ws.onmessage = function (event) {
    if (JSON.parse(event.data).confirmations > 0) {
      log("Transaction confirmed.");
      ping.stop();
      ws.close();
    }
  }
  ws.onopen = function(event) {
    ws.send(JSON.stringify({filter: "event=new-block-tx&hash="+finaltx.tx.hash}));
  }
  log("Waiting for confirmation... (may take > 10 min)")
}

function checkError(msg) {
  if (msg.errors && msg.errors.length) {
    log("Errors occured!!/n" + msg.errors.join("/n"));
    return true;
  }
}

function pinger(ws) {
  var timer = setInterval(function() {
    if (ws.readyState == 1) {
      ws.send(JSON.stringify({event: "ping"}));
    }
  }, 5000);
  return {stop: function() { clearInterval(timer); }};
}

function log(msg) {
  $("div.log").append("<div>" + msg + "</div>")
}

// Chaining
// $.post(rootUrl+"/addrs")
//   .then(newTransaction)
//   .then(signAndSend)
//   .then(waitForConfirmation);
