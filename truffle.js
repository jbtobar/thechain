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
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0xbcec0503ac99f28d009797fe320cff2f9ec7b836", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};
