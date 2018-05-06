const Escrow = artifacts.require('Escrow')

module.exports = function(deployer) {
    deployer.deploy(Escrow,'0xc4DaC89C660fC3DaE378167380261e0135d1591b','0xf1d4E353A9650750B2f6497f61Bb5DAAcb19C54a')
};
