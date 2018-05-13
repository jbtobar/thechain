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









// NEW TEST



// FutureToken: 0xc769b3e9e6cc4cd69713430bd40dc74d7cc28d87
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
bld = require('./build/contracts/FutureToken.json')
adl = '0xb2079d3c91061beedfbac4a593d219faa0cbf28f'
var contract = new web3.eth.Contract(bld.abi,adl)



contract.methods.price().call().then(function(d){console.log(d)})
// price()
// > 1000000000000000000
// collateral_buyer()
// > 150000000000000000
// collateral_seller()
// > 300000000000000000

// Price of Underlying is 1.0 ETH
// wei: 1000000000000000000
// Buyer Collateral is:
contract.methods.setPrice(2000000000000000000).send({from:'0xFa54Ff47f3Baf5D52f9B7e8390cf4357f65DA1bd'}).then(function(d){console.log(d)})
// > 2000000000000000000

ad10 = '0x9a9bafcda2b54e7c16e244300113e1842bd8f486'
contract.methods.openLongSide().send({from:ad10,value:web3.utils.toWei('2','ether')}).then(function(d){console.log(d)})
// HASH
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 2000000000000000000
contract.methods.balances_buyers(ad10).call().then(function(d){console.log(d)})
// > 13

ad9 = '0x980ec79a8365356e4188240d2d0765b5f4d2248e'
contract.methods.openShortSide().send({from:ad9,value:web3.utils.toWei('2','ether')}).then(function(d){console.log(d)})
// HASH
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 4000000000000000000
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 6


ad10 = '0x9a9bafcda2b54e7c16e244300113e1842bd8f486'
contract.methods.closeLongSide(3).send({from:ad10}).then(function(d){console.log(d)})
// HASH
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 3550000000000000000
contract.methods.balances_buyers(ad10).call().then(function(d){console.log(d)})
// > 10
web3.eth.getBalance(ad10).then(function(d){console.log(d)})
// > 98446969780000000000


ad9 = '0x980ec79a8365356e4188240d2d0765b5f4d2248e'
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 97998323060000000000
contract.methods.closeLongSide(2).send({from:ad9}).then(function(d){console.log(d)})
// VM EXCEPTION
contract.methods.closeShortSide(2).send({from:ad9}).then(function(d){console.log(d)})
// HASH
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 4
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 98596841240000000000

web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 2950000000000000000


contract.methods.owner().call().then(function(d){console.log(d)})
// 0xFa54Ff47f3Baf5D52f9B7e8390cf4357f65DA1bd
ad1 = '0xFa54Ff47f3Baf5D52f9B7e8390cf4357f65DA1bd'
contract.methods.price().call().then(function(d){console.log(d)})
// > 1000000000000000000

contract.methods.setPrice(2000000000000000000).send({from:'0xFa54Ff47f3Baf5D52f9B7e8390cf4357f65DA1bd'}).then(function(d){console.log(d)})
contract.methods.withdrawAll().send({from:'0xFa54Ff47f3Baf5D52f9B7e8390cf4357f65DA1bd'}).then(function(d){console.log(d)})
