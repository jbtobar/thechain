const Escrow = artifacts.require('Escrow')

module.exports = function(deployer) {
    deployer.deploy(Escrow,'0xE04202F262b79AA24e09F29A3461690EFDF63f63','0xf1d4E353A9650750B2f6497f61Bb5DAAcb19C54a')
};
