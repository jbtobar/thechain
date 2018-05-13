var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

bld = require('./build/contracts/RTSOracle.json')
adl = ''
var contract = new web3.eth.Contract(bld.abi,adl)

{from:wallet.address.eth,value:100}

contract.methods.CallbackGetRTS().call().then(function(result){console.log(result)})


contract.methods.setRTS({value:5,from: web3.eth.accounts[0]}).send().then(function(result){console.log(result)})

contract.methods.setRTS(5).send({from: web3.eth.defaultAccount}).then(function(result){console.log(result)})

setRTSprice(uint256)

bld = require('./build/contracts/ERC20Token.json')
adl = '0x929090C748F6f9F99977E783c0BB8d88913cB3C1'
var contract = new web3.eth.Contract(bld.abi,adl)

contract.methods.balanceOf().call().then(function(result){console.log(result)})

web3.eth.defaultAccount
contract.methods.setPrices('RI110000BX7',5).send({from: web3.eth.defaultAccount}).then(function(result){console.log(result)})
contract.methods.getPrice('RI110000BX7').call().then(function(result){console.log(result)})


a
adl = '0x929090C748F6f9F99977E783c0BB8d88913cB3C1'
var contract = new web3.eth.Contract(bld.abi,adl)




a
adl = '0x3618efa90cfa4f046d91eebf709bd46e7d7bc2cc'
var contract = new web3.eth.Contract(bld.abi,adl)


var hexo = web3.utils.fromAscii("RI110000BL7")
contract.methods.setPrice(hexo,5).send({from: web3.eth.defaultAccount}).then(function(result){console.log(result)})
contract.methods.uints1(hexo).call().then(function(result){console.log(result)})

var hexos = [web3.utils.fromAscii("RI110000BL7"),web3.utils.fromAscii("RI110000BL8")]
var vexos = [10,3]
web3.eth.defaultAccount = '0xcba2e2f1f65e9d85389d68b86227a3480e79db5c'

contract.methods.setPrices(hexos,vexos).send({from:ad1}).then(function(result){console.log(result)})
contract.methods.getPrices(hexos).call({from: ad2,gas:6000000}).then(function(result){console.log(result)})

web3.eth.estimateGas(contract.methods.getPrices(hexos).call({from: ad2,gas:6000000}).then(function(result){console.log(result)}))


contract.methods.owner().call().then(function(result){console.log(result)})



bld = require('./build/contracts/Storager2.json')
