var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

bld = require('./build/contracts/RTSOracle.json')
adl = ''
var contract = new web3.eth.Contract(bld.abi,adl)

{from:wallet.address.eth,value:100}

contract.methods.CallbackGetRTS().call().then(function(result){console.log(result)})


contract.methods.setRTS({value:5,from: web3.eth.accounts[0]}).send().then(function(result){console.log(result)})

contract.methods.setRTS(5).send({from: web3.eth.defaultAccount}).then(function(result){console.log(result)})



bld = require('./build/contracts/ERC20Token.json')
adl = '0x929090C748F6f9F99977E783c0BB8d88913cB3C1'
var contract = new web3.eth.Contract(bld.abi,adl)

contract.methods.balanceOf().call().then(function(result){console.log(result)})
