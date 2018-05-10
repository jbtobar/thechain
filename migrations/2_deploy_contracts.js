var RTSOracle = artifacts.require("./RTSOracle.sol");

module.exports = function(deployer) {
  deployer.deploy(RTSOracle);
};
