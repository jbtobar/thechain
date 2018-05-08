
var fs = require("fs");
var Web3 = require('web3'); // https://www.npmjs.com/package/web3
var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'hair route suffer hood brother virus carbon fall song jewel food upset business reunion pull'

// var Web3 = require('web3');
// var web3 = new Web3();

var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");
web3 = new Web3(provider)


bld = require('./build/contracts/Escrow.json')
// var contract = new web3.eth.Contract(bld.abi,bld.networks['3'].address)


// Read the compiled contract code
// Compile with
// solc SampleContract.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
// let source = fs.readFileSync("contracts.json");
// let contracts = JSON.parse(source)["contracts"];

// ABI description as JSON structure
// let abi = JSON.parse(contracts.SampleContract.abi);
let abi = bld.abi

// Smart contract EVM bytecode as hex
// let code = '0x' + contracts.SampleContract.bin;
let code = bld.bytecode

// Create Contract proxy class
var SampleContract = new web3.eth.Contract(abi);

// Unlock the coinbase account to make transactions out of it
// console.log("Unlocking coinbase account");
// var password = "";
// try {
//   web3.personal.unlockAccount(web3.eth.coinbase, password);
// } catch(e) {
//   console.log(e);
//   return;
// }
ad1 = provider.addresses[0]

console.log("Deploying the contract");
// let contract = SampleContract.new('0xc4DaC89C660fC3DaE378167380261e0135d1591b','0xf1d4E353A9650750B2f6497f61Bb5DAAcb19C54a',{from: ad1, gas: 1000000, data: code});



SampleContract.deploy({
  data: code,
  arguments: ['0xc4DaC89C660fC3DaE378167380261e0135d1591b','0xe65bd7bedbb8c72bd089e8699fd6d2a85fed4ab4']
}).send({
  from: ad1,
  gas: 1000000,
  gasPrice: '30000000000'}, function(error, transactionHash){ console.log(error);console.log(transactionHash) })
  .on('error', function(error){ console.log(error) })
  .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
  // .on('receipt', function(receipt){console.log(receipt.contractAddress)})
  // .on('confirmation', function(confirmationNumber, receipt){ console.log(receipt);console.log(confirmationNumber) })
  .then(function(newContractInstance){
// console.log(newContractInstance.options.address)
console.log('sapisula')
});



//
// // Transaction has entered to geth memory pool
// console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + SampleContract.transactionHash);
//
// // http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// // We need to wait until any miner has included the transaction
// // in a block to get the address of the contract
// async function waitBlock() {
//   while (true) {
//     let receipt = web3.eth.getTransactionReceipt(SampleContract.transactionHash);
//     if (receipt && receipt.contractAddress) {
//       console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
//       console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
//       break;
//     }
//     console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
//     await sleep(4000);
//   }
// }
//
// waitBlock();
