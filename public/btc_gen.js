const Btc = require('bitcoinjs-lib')
const TestNet = Btc.networks.testnet

let keyPair = Btc.ECPair.makeRandom({ network: TestNet })
let publicKey = keyPair.getAddress()
let privateKey = keyPair.toWIF()
console.log(`Public: ${publicKey} \n Private: ${privateKey}`)

// let privKey =
let ourWallet = new Btc.ECPair.fromWIF(privateKey, TestNet)
console.log("ourWallet public key:", ourWallet.getAddress())


const BigInteger = require('bigi')
// let passphrase = 'n89jgim76'
let passphrase = '889mremlJJ'

function generateAddressFromSHA256Hash(passphrase) {
  let hash = Btc.crypto.sha256(passphrase);
  let d = BigInteger.fromBuffer(hash);
  let keyPair2 = new Btc.ECPair(d, null, { network: TestNet });
  return keyPair2;
}
let keyPair1 = generateAddressFromSHA256Hash(passphrase);
console.log('keyPair public address: ', keyPair1.getAddress())

//
// Public: n1cJjWGFF6hBkuPPQYWF2xzgfzkXPre7Lq
//  Private: cNKxzj7DSahfwFwiTvfCU9fZdQq95PnVryWnAGaf5BDYV9vf4FgE
// ourWallet public key: n1cJjWGFF6hBkuPPQYWF2xzgfzkXPre7Lq
// keyPair public address:  mjsDZ2dFsM6pd3xYUw2qL96MQJjSSk8m9L
// const faucet = require('testnet-faucet')({
//   apiKey: 'blocktrail-api-key',
// })
// faucet('n1cJjWGFF6hBkuPPQYWF2xzgfzkXPre7Lq', 2000).then(() => {
//   console.log('n1cJjWGFF6hBkuPPQYWF2xzgfzkXPre7Lq')
//   console.log('faucet')
// })


// Public: n358GnmXKbdQfS8prnzbNXvEM6kMhHQnEZ
//  Private: cTpmdVfXhHVretdUbptP5ZXivkvtnTikk3FaLoCEYpARk8tmeGFZ
//
// ourWallet public key: n358GnmXKbdQfS8prnzbNXvEM6kMhHQnEZ
// keyPair public address:  muqp5uDxHG3P1rwtzjsVes1FvrfxmmjLbq
const Btc = require('bitcoinjs-lib')
const TestNet = Btc.networks.testnet
const BigInteger = require('bigi')
function generateAddressFromSHA256Hash(passphrase) {
  let hash = Btc.crypto.sha256(passphrase);
  let d = BigInteger.fromBuffer(hash);
  let keyPair2 = new Btc.ECPair(d, null, { network: TestNet });
  return keyPair2;
}


let tx = new Btc.TransactionBuilder(TestNet)


let keyPair1 = generateAddressFromSHA256Hash('n89jgim76')
let keyPair2 = generateAddressFromSHA256Hash('889mremlJJ')

let amountWeHave = 220000000 // 1.3 BTC
let amountToKeep = 200000000 // 1 BTC
let transactionFee = 1000 // .00001 BTC
let amountToSend = amountWeHave - amountToKeep - transactionFee

tx.addInput('a8de639a1dd13c7b422a3f44beb61fbe242b276eb7cd2bbb51e409f38a5192dc',0)



tx.addOutput(keyPair2.getAddress(), amountToSend)

tx.addOutput(keyPair1.getAddress(), amountToKeep)

tx.sign(0, keyPair1)

let tx_hex = tx.build().toHex()

console.log('our beautiful transaction: ', tx_hex)

const request = require('request');
let addr = 'n1cJjWGFF6hBkuPPQYWF2xzgfzkXPre7Lq'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'
// log unspent transactions
request.get(apiUrl + addr + '/utxo', (err, req, body) => {
  console.log(JSON.parse(body))
 }
);
// log balance
request.get(apiUrl + addr + '/balance', (err, req, body) => {
  console.log(JSON.parse(body))
 }
);
