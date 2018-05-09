// bitcoinjs_notes.js
var bitcoin = require('bitcoinjs-lib')
var bigi = require('bigi')



function BTCK(arg) {
  var hash = bitcoin.crypto.sha256(Buffer.from(arg))
  var d = bigi.fromBuffer(hash)
  const testnet = bitcoin.networks.testnet

  var keyPair = new bitcoin.ECPair(d,null,{ network: testnet })
  var address = keyPair.getAddress()
  return keyPair
}

kp = BTCK(seed.phrase)
let publicKey = kp.getAddress()
let privateKey = kp.toWIF()
console.log(`Public: ${publicKey} \n Private: ${privateKey}`)




const request = require('request');
let addr = publicKey
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'
// log unspent transactions
request.get(apiUrl + addr + '/utxo', (err, req, body) => {
  // console.log(JSON.parse(body))
  utxs = JSON.parse(body)
 }
).then(function(err){console.log(err)})
// log balance
request.get(apiUrl + addr + '/balance', (err, req, body) => {
  console.log(JSON.parse(body))
 }
).then(function(err){console.log(err)});


var tx1 = new bitcoin.TransactionBuilder(testnet)




let amountWeHave = 65000000 //
let amountToKeep = 64900000 // 1 BTC
let transactionFee = 1000 // .00001 BTC
let amountToSend = amountWeHave - amountToKeep - transactionFee

utxs[0].txid
utxs[0].vout

tx1.addInput(utxs[0].txid,utxs[0].vout )

suero_address = 'n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD'
tx1.addOutput(suero_address, amountToSend)

tx1.addOutput(publicKey, amountToKeep)


tx1.sign(0, kp)

var tx_hex = tx1.build().toHex()


request.post({url:'https://testnet.blockexplorer.com/api/tx/send',rawtx: "0100000001d01af2469051469816fd4bfb35173b30cfa9eba4035f00af18f489293986ee91000000006b4830450221009ff2522a8809e62fad1ba17560dc4577c0ec50d7a0f2f527536fefecde94917f02201ecd02b3de8a49e03eae5dd11f11f43ac8aad875052dc28291538aa9beda5f100121020bf57c4a85cf9262b6bbdbe9eb6334d576bf786250c9dbade92d6d68f2cd39e3ffffffff02b8820100000000001976a914fd9a3c7280845277177699c32e3d4e85fa9a82d588aca04bde03000000001976a914738dba1bac1182afd78dad7564dee662f2a2dd0688ac00000000"},function(error, response, body){
  console.log(body);
}).then(function(err){console.log(err)})


var pushtx = {
  tx:tx_hex,
};
$.post('https://api.blockcypher.com/v1/bcy/test/txs/push', JSON.stringify(pushtx))
  .then(function(d) {console.log(d)});


  var newtx = {
    inputs: [{addresses: ['mr3wnUgRxJpEZPiHik2WHJdGDgqWtvuESn']}],
    outputs: [{addresses: ['n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD'], value: 100000}]
  };
  $.post('https://api.blockcypher.com/v1/btc/test3/txs/new', JSON.stringify(newtx))
    .then(function(d) {console.log(d);window.newtx = d});


var source = {
  private : "1af97b1f428ac89b7d35323ea7a68aba8cad178a04eddbbf591f65671bae48a2",
  public  : "03bb318b00de944086fad67ab78a832eb1bf26916053ecd3b14a3f48f9fbe0821f",
  address : "mtWg6ccLiZWw2Et7E5UqmHsYgrAi5wqiov"
}
var key   = new bitcoin.ECKey(bigi.fromHex(source.private), true);


var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
function signAndSend(newtx) {
  if (checkError(newtx)) return;

  newtx.pubkeys     = [];
  newtx.signatures  = newtx.tosign.map(function(tosign) {
    newtx.pubkeys.push(source.public);
    return key.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
  });
  return $.post(rootUrl+"/txs/send", JSON.stringify(newtx));
}













    var bitcoin = require("bitcoinjs-lib");
    var bigi    = require("bigi");
    var buffer  = require('buffer');
    var keys    = new bitcoin.ECPair(bigi.fromHex(my_hex_private_key));

    kp = BTCK(seed.phrase)
    var keys = kp

    var newtx = {
      inputs: [{addresses: ['mr3wnUgRxJpEZPiHik2WHJdGDgqWtvuESn']}],
      outputs: [{addresses: ['n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD'], value: 100000}]
    };
    // calling the new endpoint, same as above
    $.post('https://api.blockcypher.com/v1/btc/test3/txs/new', JSON.stringify(newtx))
      .then(function(tmptx) {
        // signing each of the hex-encoded string required to finalize the transaction
        tmptx.pubkeys = [];
        tmptx.signatures = tmptx.tosign.map(function(tosign, n) {
          tmptx.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
          return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
        });
        // sending back the transaction with all the signatures to broadcast
        $.post('https://api.blockcypher.com/v1/btc/test3/txs/send', tmptx).then(function(finaltx) {
          console.log(finaltx);
        })
      });








suero_address
Public: n4dt26oCnDWeUexhGjxTHHwFJBVdGawngD
 Private: cViebsBbExGqAwTjMMELH7XmQoDMHqWofqqj5RutJ3Xydg1nCtFj





http://api.blockcypher.com/v1/btc/test3/addrs

https://live.blockcypher.com/btc-testnet/pushtx/?t=0100000001D01AF2469051469816FD4BFB35173B30CFA9EBA4035F00AF18F489293986EE91000000006B4830450221009FF2522A8809E62FAD1BA17560DC4577C0EC50D7A0F2F527536FEFECDE94917F02201ECD02B3DE8A49E03EAE5DD11F11F43AC8AAD875052DC28291538AA9BEDA5F100121020BF57C4A85CF9262B6BBDBE9EB6334D576BF786250C9DBADE92D6D68F2CD39E3FFFFFFFF02B8820100000000001976A914FD9A3C7280845277177699C32E3D4E85FA9A82D588ACA04BDE03000000001976A914738DBA1BAC1182AFD78DAD7564DEE662F2A2DD0688AC00000000


const faucet = require('testnet-faucet')({
  apiKey: 'blocktrail-api-key',
})

faucet('some-address', 2000).then(() => {
  // success!
})
// function faucet (address, value, callback) {
//   dhttp({
//     method: 'POST',
//     url: APIURL + '/r/faucet?address=' + address + '&value=' + value + '&key=' + APIPASS
//   }, function (err, txId) {
//     if (err) return callback(err)
//
//     unspents(address, function (err, results) {
//       if (err) return callback(err)
//
//       callback(null, results.filter(x => x.txId === txId).pop())
//     })
//   })
// }
//
// // 2ca0eb7bcd4a4e50b5ac867c85a1cb26
//
// $.post('https://api.blockcypher.com/v1/bcy/test/addrs?token=$YOUR_TOKEN')
//   .then(function(d) {console.log(d)});
// > {
// > "private": "26415016a2fb49f51aef161cb35bd537be07b75a6ac1e297d3b7a370cc85433b",
// > "public": "02c572d062fefcc8c3e1bf5016450addcedb89cd7e4507d8a323f327b4ad1018e0",
// > "address": "CFqoZmZ3ePwK5wnkhxJjJAQKJ82C7RJdmd"
// > }
// '1BXzVRbT9HNynHEg1B48TPQwMhEoy8ed3M'
// // Fund prior address with faucet
// var data = {"address":"1BXzVRbT9HNynHEg1B48TPQwMhEoy8ed3M", "amount": 100000}
// $.post('https://api.blockcypher.com/v1/bcy/test/faucet?token=$0eea83e9a3a84fd8a2b18b075d22f6a7', JSON.stringify(data))
//   .then(function(d) {console.log(d)});
// > {
// >   "tx_ref": "02dbf5585d438a1cba82a9041dd815635a6b0df684225cb5271e11397a759479"
// > }
//
//
//
//
//
//
// https://blockchain.info/unspent?active=1P5zVkaCkh43D5sL24gGVQ2GHS5iSGGoyw
//
// function rng () { return Buffer.from('nurse plug never enroll abstract chat fantasy primary breeze thunder virtual expect reason stairs silver') }
//
//
//
//
//
//
// mubSzQNtZfDj1YdNP6pNDuZy6zs6GDn61L
//
//
//
//
//
//
//
//
//
//
//
