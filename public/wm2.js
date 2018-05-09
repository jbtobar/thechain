window.bitcoin = require('bitcoinjs-lib')
window.Web3 = require('web3');
window.HDWalletProvider = require("truffle-hdwallet-provider");
window.bigi = require('bigi')
window.buffer  = require('buffer');

function Buffa (arg) {
	return Buffer.from(arg)
}
window.Buffa = Buffa
// module.exports = {
// 	Buffa
function BTCK(arg,network) {
  var hash = bitcoin.crypto.sha256(Buffer.from(arg))
  var d = bigi.fromBuffer(hash)
  if (network == 'test') {
    const testnet = bitcoin.networks.testnet
    var keyPair = new bitcoin.ECPair(d,null,{ network: testnet })
  } else if (network == 'main') {
    var keyPair = new bitcoin.ECPair(d)
  } else {
    return "Please set network argument to \'test\' or \'main\'"
  }

  
  var address = keyPair.getAddress()
  return keyPair
}
window.BTCK = BTCK

// }
// let keyPair = new Btc.ECPair(d, null, { network: TestNet });
