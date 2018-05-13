// var RTSToken = artifacts.require("./RTSToken.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(RTSToken);
// };

// var Future = artifacts.require("./Future.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(Future,);
// };
// FutureToken

var FutureToken = artifacts.require("./FutureToken.sol");

module.exports = function(deployer) {
  deployer.deploy(FutureToken);
};
