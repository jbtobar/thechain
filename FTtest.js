var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
bld = require('./build/contracts/FutureToken.json')
// FutureToken: 0x710189e495594db34d6822eb0a5c55fd5f21c83f
adl = '0x6d7b84f7587c3f15bbd8dbebabb4df2baa24615b'
var contract = new web3.eth.Contract(bld.abi,adl)


// console.log('collateral_buyer()')
contract.methods.collateral_buyer().call().then(function(d){console.log(d)})
> 150000000000000000
contract.methods.collateral_seller().call().then(function(d){console.log(d)})
> 300000000000000000
contract.methods.price().call().then(function(d){console.log(d)})
> 1000000000000000000





ad10 = '0x7222d4df2138217c974978703b724077720294d7'
console.log(ad10)
console.log('openLongSide()')
contract.methods.openLongSide().send({from:ad10,value:web3.utils.toWei('2','ether')}).then(function(d){console.log(d)})
// HASH
console.log('getBalance(adl)')
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 2000000000000000000
console.log('getBalance(ad10)')
contract.methods.balances_buyers(ad10).call().then(function(d){console.log(d)})
// > 13

ad9 = '0x442ad30fd2ca3d26c879bddd024e7d23d00237dc'
console.log(ad9)
console.log('openShortSide()')
contract.methods.openShortSide().send({from:ad9,value:web3.utils.toWei('2','ether')}).then(function(d){console.log(d)})
// HASH
console.log('getBalance(adl)')
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 4000000000000000000
console.log('balances_sellers(ad9)')
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 6



console.log(ad10)
console.log('closeLongSide(3)')
contract.methods.closeLongSide(3).send({from:ad10}).then(function(d){console.log(d)})
// HASH
console.log('getBalance(adl)')
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 3550000000000000000
console.log('balances_buyers(ad10)')
contract.methods.balances_buyers(ad10).call().then(function(d){console.log(d)})
// > 10
console.log('getBalance(ad10)')
web3.eth.getBalance(ad10).then(function(d){console.log(d)})
// > 98447382080000000000


console.log(ad9)
console.log('getBalance(ad9)')
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 97998322620000000000
// console.log('closeLongSide(2)')
// contract.methods.closeLongSide(2).send({from:ad9}).then(function(d){console.log(d)})
// VM EXCEPTION
console.log('closeShortSide(2)')
contract.methods.closeShortSide(2).send({from:ad9}).then(function(d){console.log(d)})
// HASH
console.log('balances_sellers(ad9)')
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 4
console.log('getBalance(ad9)')
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 98597384280000000000
console.log('getBalance(adl)')
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 2950000000000000000

//
contract.methods.owner().call().then(function(d){console.log(d)})
// 0x58148B7b7835ef22BA5cDecba1494D0A31A72702
contract_owner = '0x58148B7b7835ef22BA5cDecba1494D0A31A72702'
contract.methods.price().call().then(function(d){console.log(d)})
// > 1000000000000000000
//
contract.methods.setPrice(2000000000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
contract.methods.price().call().then(function(d){console.log(d)})
// > 2000000000000000000
// 2.0 ETH
contract.methods.collateral_seller().call().then(function(d){console.log(d)})
// > 300000000000000000
// 0.3 ETH
contract.methods.collateral_buyer().call().then(function(d){console.log(d)})
// > 150000000000000000
// 0.15 ETH


contract.methods.setPrice(1500000000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
> 1500000000000000000
// 1.5 ETH

contract.methods.setCollateralBuyer(225000000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
//  HASH
contract.methods.collateral_buyer().call().then(function(d){console.log(d)})
// > 225000000000000000


// ad10
contract.methods.closeLongSide(5).send({from:ad10}).then(function(d){console.log(d)})
// HASH
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 1825000000000000000
web3.eth.getBalance(ad10).then(function(d){console.log(d)})
// > 99571446380000000000
contract.methods.balances_buyers(ad10).call().then(function(d){console.log(d)})
// > 5


contract.methods.setCollateralSeller(450000000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
// HASH
contract.methods.collateral_seller().call().then(function(d){console.log(d)})
// > 450000000000000000


// ad9
contract.methods.closeShortSide(2).send({from:ad9}).then(function(d){console.log(d)})
// HASH
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 2
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 99496445940000000000
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 925000000000000000
web3.eth.getBalance(ad10).then(function(d){console.log(d)})
// > 99571446380000000000
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 99496445940000000000
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 2
contract.methods.balances_buyers(ad10).call().then(function(d){console.log(d)})
// > 5

contract.methods.setPrice(750000000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
// HASH
contract.methods.price().call().then(function(d){console.log(d)})
> 750000000000000000




contract.methods.setCollateralSeller(225000000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
// HASH
contract.methods.collateral_seller().call().then(function(d){console.log(d)})
// > 225000000000000000

contract.methods.setCollateralBuyer(112500000000000000).send({from:contract_owner}).then(function(d){console.log(d)})
//  HASH
contract.methods.collateral_buyer().call().then(function(d){console.log(d)})
// > 112500000000000000


> 925000000000000000
contract.methods.closeLongSide(1).send({from:ad10}).then(function(d){console.log(d)})
// HASH
 web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 812500000000000000
web3.eth.getBalance(ad10).then(function(d){console.log(d)})
// 99681661640000000000




contract.methods.closeShortSide(2).send({from:ad9}).then(function(d){console.log(d)})
// HASH
contract.methods.balances_sellers(ad9).call().then(function(d){console.log(d)})
// > 0
web3.eth.getBalance(ad9).then(function(d){console.log(d)})
// > 99945976760000000000
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 362500000000000000




contract.methods.closeLongSide(2).send({from:ad10}).then(function(d){console.log(d)})
// HASH
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 812500000000000000
web3.eth.getBalance(ad10).then(function(d){console.log(d)})
// 99681661640000000000


contract.methods.closeLongSide(1).send({from:ad10}).then(function(d){console.log(d)})
// VM EXEPCTION



ad8 = '0x4c6bb6e3238e724279d6e9d4bc40e07a2cf9d1a2'
web3.eth.getBalance(ad8).then(function(d){console.log(d)})
// > 100000000000000000000
contract.methods.openShortSide().send({from:ad8,value:web3.utils.toWei('2','ether')}).then(function(d){console.log(d)})
// HASH
web3.eth.getBalance(ad8).then(function(d){console.log(d)})
// > 97998322620000000000
web3.eth.getBalance(adl).then(function(d){console.log(d)})
// > 2137500000000000000

contract.methods.closeLongSide(2).send({from:ad10}).then(function(d){console.log(d)})
