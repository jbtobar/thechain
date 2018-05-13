var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

bld = require('./build/contracts/RTSOracle.json')
adl = '0xf084fec2fab75b7ce6105e12736c4f2936f95e55'
var contract = new web3.eth.Contract(bld.abi,adl)

ad2 = '0x10ffb141cb08b00663339eecfaa01cc0ca6f76ff'
web3.eth.sendTransaction({from:ad2,to:adl,value:100}).then(function(d){console.log(d)})

contract.methods.balanceOf(ad2).call().then(function(d){console.log(d)})
// > 10000

web3.eth.getBalance(ad2).then(function(d){console.log(d)})
// > 99998567939999999900


contract.methods.redeem(8).send({from:ad2}).then(function(d){console.log(d)})


contract.methods.balanceOf(ad2).call().then(function(d){console.log(d)})
// > 9992
web3.eth.getBalance(ad2).then(function(d){console.log(d)})
// > 99997578199999999900


contract.methods.totalSupply().call().then(function(d){console.log(d)})


contract.methods.totalSupply().call().then(function(d){console.log(d)})
// > 10000


ad3 = '0x30fedf408eb7138a501610c11b5d9f6b38c086d8'
web3.eth.sendTransaction({from:ad3,to:adl,value:10000}).then(function(d){console.log(d)})
contract.methods.balanceOf(ad3).call().then(function(d){console.log(d)})
// > 1000000
web3.eth.getBalance(ad2).then(function(d){console.log(d)})
// > 99997578199999999900


contract.methods.totalSupply().call().then(function(d){console.log(d)})
// > 1010000


// START AGAIN
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

bld = require('./build/contracts/RTSToken.json')
// Contract created: 0x533d84ef33d7fa10aa6f27084cf9e25dcdb4880c
// Gas usage: 1930129
// COST $10.421
adl = '0x2618ad7d3d5ad858d3fab3c592cedb82ab45fd30'

ad1 = '0xfa54ff47f3baf5d52f9b7e8390cf4357f65da1bd'
// > 99772431600000000000
// 99.7724316
ad2 = '0xc64f42c4ca69151f6038470027376509159ec8ad'
// 100000000000000000000
// 100
ad3 = '0xd9029b3675c86afd6296ee4b0c5973594c1186e7'
// 100000000000000000000
// 100
// ad4 = '0xfcd1346cb79b0f519b025e705fd231636200c87c'
// 100000000000000000000
// 100
web3.eth.getBalance(****).then(function(d){console.log(d)})
web3.eth.getBalance(ad1).then(function(d){console.log(d);console.log(web3.utils.fromWei(d,'ether'))})


var contract = new web3.eth.Contract(bld.abi,adl)
contract.methods.rtsprice().call().then(function(d){console.log(d)})
// 100
contract.methods.setRTSprice(675).send({from:ad1}).then(function(result){console.log(result)})
contract.methods.rtsprice().call().then(function(d){console.log(d)})
// 675
web3.eth.getBalance(ad1).then(function(d){console.log(d);console.log(web3.utils.fromWei(d,'ether'))})
// > 99771886680000000000
// 99.77188668
web3.eth.sendTransaction({from:ad3,to:adl,value:web3.utils.toWei('0.5','ether')}).then(function(d){console.log(d)})

web3.eth.getBalance(ad1).then(function(d){console.log(d);console.log(web3.utils.fromWei(d,'ether'))})
// > 99772585280000000000
// 99.77258528
web3.eth.getBalance(ad3).then(function(d){console.log(d);console.log(web3.utils.fromWei(d,'ether'))})
// > 99498721380000000000
// 99.49872138
web3.eth.getBalance(adl).then(function(d){console.log(d);console.log(web3.utils.fromWei(d,'ether'))})
// > 500000000000000000
// 0.5

contract.methods.totalSupply().call().then(function(d){console.log(d)})
// > 33750
contract.methods.balanceOf(ad3).call().then(function(d){console.log(d)})
// > 33750
contract.methods.redeem(8).send({from:ad1}).then(function(d){console.log(d)})
// REVERT


contract.methods.redeem(10).send({from:ad3}).then(function(d){console.log(d)})
contract.methods.balanceOf(ad3).call().then(function(d){console.log(d)})
// > 33740
web3.eth.getBalance(ad3).then(function(d){console.log(d);console.log(web3.utils.fromWei(d,'ether'))})
// > 99497749748148148148
// 99.497749748148148148

// Lost 6 cents in transaction.
// 971631851864064
