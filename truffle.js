var HDWalletProvider = require("truffle-hdwallet-provider");
// const mnemonic = 'type intact dish action paddle rigid soap happy airport review message donor october unable pulp'
const mnemonic = 'hair route suffer hood brother virus carbon fall song jewel food upset business reunion pull'
// const priv_key = 'd237bc84e15f97aa6e73cfcca0b090f51a1b226fd052e725e86b169452ddf1fe'
// const priv_key = '0xd237bc84e15f97aa6e73cfcca0b090f51a1b226fd052e725e86b169452ddf1fe'
//module.exports = {
//  networks: {
//    development: {
//      host: "localhost",
//      port: 8545,
//      network_id: "*" // Match any network id
//    }
//  }
//};

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "	https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE")
      },
      network_id: 3,
      // gas:4711751,
      gas:4000000,
      // gas:4712388,
      // gas:4711644,
      // gasPrice:10000000000000,
      gasPrice:10000000000,
      // from:'0xE04202F262b79AA24e09F29A3461690EFDF63f63',
    }
// #    rinkeby: {
// #      host: "localhost", // Connect to geth on the specified
// #      port: 8545,
// #      from: "0xbcec0503ac99f28d009797fe320cff2f9ec7b836", // default address to use for any transaction Truffle makes during migrations
// #      network_id: 4,
// #      gas: 4612388 // Gas limit used for deploys
// #    }
  }
};
