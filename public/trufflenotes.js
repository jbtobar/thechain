Escrow.deployed().then(function(instance) {return instance.address;}).then(function(value){return value});

Escrow.deployed().then(function(instance) {return instance.deposit.call();}).then(function(balance) {console.log(balance);})

web3.eth.sendTransaction({from:'0x3ed2b925816119904bac87317af1653cae8a2413', to:'0x938c5665d2d8f4327832efe16c9205db0a8f8b2e', value: 1000000000000000000})

web3.eth.sendTransaction({from:adx, to:contract_address, value: 1000000000000000000,gas: 4712388, gasPrice: 7000000000}).then(function(data){console.log(data)})

web3.eth.sendTransaction({from:adx, to:contract_address, value: 1000000000000000000,gas:  4711553, gasPrice: 120000000000},function(data){console.log(data)})

tx = {from:ad1, to:contract_address, value: 1000000000000000000,gas:  4711553, gasPrice: 120000000000}
pk1 = '0x25de6c4581792f3b23f746a87e4a19e5009e53127673859a7fdc3e39a65e65e4'
web3.eth.accounts.signTransaction(tx, pk1,function(data){console.log(data)});

web3.eth.accounts.signTransaction(tx, pk1).then(console.log)


web3.eth.sendSignedTransaction('0xf86d80851bf08eb0008347e481946a63aac04a7c5c498632419ac11c3f1dae246ea3880de0b6b3a76400008029a0a49706b449895de2e3666b2a0365a3c2f6142b7a8df8ad9c761f0049c7246e28a074549de1fde8b6df2d8fc17a2b87e4313caed13c73f1740b92c7a730efa27eed').on('receipt', console.log);

4712388

gas:4000000,
// gas:4712388,
// gas:4711644,
// gasPrice:10000000000000,
gasPrice:10000000000,

Escrow.deployed().then(i => app = i)
app.deposit({value:100})


///////
var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'hair route suffer hood brother virus carbon fall song jewel food upset business reunion pull'
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");

contract_address = '0x6a63aac04a7c5c498632419ac11c3f1dae246ea3'


var Web3 = require('web3');
web3 = new Web3(provider)

web3.eth.getBalance


web3.eth.sendTransaction({
  to:
  from:
})

fs.writeFile('./public/mnemonia.json', JSON.stringify(santi), 'utf8',function(err){console.log(err)});


var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'cook primary oven absurd laugh account arm truly current wish behind cricket catalog slot cry'
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");

var Web3 = require('web3');
web3 = new Web3(provider)

ad1 = '0xc4DaC89C660fC3DaE378167380261e0135d1591b'
contract_address = '0x6a63aac04a7c5c498632419ac11c3f1dae246ea3'
web3.eth.sendTransaction({from:ad1, to:contract_address, value: 1000000000000000000,gas:  4711553, gasPrice: 120000000000},function(data){console.log(data)})


app.send(web3.toWei(1, "ether")).then(function(result) {console.log(result)});



contract.methods.deposit().send({from:ad1,value:100}).then(function(result){console.log(result)})


var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'misery clarify midnight absurd gallery morning stove item predict shop despair absorb caution stem nominee'
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");

var Web3 = require('web3');
web3 = new Web3(provider)

bld = require('./build/contracts/Escrow.json')
var contract = new web3.eth.Contract(bld.abi,bld.networks['3'].address)


ad1 = provider.addresses[0]

contract.methods.accept().send({from:ad1}).then(function(result){console.log(result)})

contract.methods.accept().call().then(function(d){console.log(d)})
