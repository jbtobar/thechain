# MAIA

This is the repository of the webapp MAIA.

MAIA is a brokerage service on the blockchain. It offers crypto wallets as well as an ecosystem to interact with other users through contracts on the ethereum blockchain.

## How it works

A user accesses the MAIA wallet and registers his/her username.
You access the MAIA wallet \{here} and it will prompt you to register a username and password. Upon registration, 12 random words will be generated and will appear in front of you.

IMPORTANT: These 12 words are the only way to access your wallet. Please store them safely, preferably in a physical location. They are the seed that will generate addresses for the bitcoin, ethereum, and waves blockchain. We do not store your private keys! It it impossible to recover lost passwords.

Then, you will have access to the MAIA platform.

## The MAIA Platform

The platform offers for its users three main services:

### Wallet

Wallet: With the same password you unlock a addresses for bitcoin, waves, and ethereum. It allows you to purchase these cryptocurrencies through conventional payment methods, as well as converting and withdrawing them. You can send these funds to other users within the ecosystem by username or to any address.

### Brokered Contracts

Through MAIA you are connected to the ethereum blockchain and can interact with smart contracts. At the moment we offer three types of contracts:

Escrow contracts: You can easily enter an escrow contract with another seller by simply typing their username. An example is ...

USD/RUB Pegger Contracts: If you wish to use the benefits of the blockchain and the crypto wallet to make transactions, but are interested in using USD or RUB denominations instead of ETH,BTC,WAV denominations, you can enter a Pegger Contract. If you wish to have 100 USD in the blockchain, you will deposit 0.15 ETH to the contract which will assign to you 100 USD tokens. You can use these to transact with other users and they can easily be exchanged back to ETH and thus to conventional banking methods by sending the tokens back to the contract and the contract will send back the equivalent amount in ether. (For more about how this is done see: 'Oracle')

Options Contracts: You can enter calls and puts for a limited number of strikes on RTS Index futures as a seller or a buyer. More instruments will be added soon.

### Architecture

On an Ubuntu 16.06 server hosted by DigitalOcean in Frankfurt, we have two web applications running. The main one is a Node.js server that supports MAIA, the second one is a Python Django server that serves the options trading platform.

#### Node.js & MAIA






MAIA is a grid to facilitate transactions (depositing, withdrawing, sending) and to facilitate

The platform is hosted on a DigitalOcean server in Frankfurt.

Server Setup:
 - Ubuntu 16.06
 - PostgreSQL 9.6



MAIA is accessed on the url https://maia.moskvant.com.
On it, you will be requested to register a username


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
