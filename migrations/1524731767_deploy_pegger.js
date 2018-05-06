const Pegger = artifacts.require('Pegger')

module.exports = function(deployer) {
    deployer.deploy(Pegger,{overwrite:false})
};
