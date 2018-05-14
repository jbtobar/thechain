# MAIA

This is the repository of the webapp MAIA.

MAIA is a brokerage service on the blockchain. It offers a crypto wallet as well as an ecosystem to interact with other users through blockchain contracts.

[Contribution guidelines for this project](public/functions.js)

## Introduction

A couple of years ago I was interested in trading options on the US market. I was unable to open a brokerage account because I was not a US citizen. I then set out on a path to build my own options trading platform and brokerage service. This is the result.

This service leverages blockchain technology to solve real problems people are dealing with around the world. The majority of business and personal transaction around the globe are conducted in fiat money, however, the benefits of blockchain technology are achieved through cryptoassets. The service allows users to store their fiat money as a cryptoasset in the blockchain and peform all their usual transactions with it. The user can have confidence that these cryptoassets can easily be redeemed back to fiat.

## Features

* One Wallet for multiple cryptocurrencies and tokens (BTC \ ETH \ WAV)
* Easily store fiat (USB and RUB) as a USD or RUB denomiated cryptoasset to conduct business as usual, avoid volatile crypto prices
* Simple UI to view asset balances, make transacions, and interact with smart contracts
* Initiate Escrow contracts with other users
* Trade options and futures via a dedicated trading platform


By registering an account at the MAIA platform, a wallet containing addresses for the bitcoin, waves, and ethereum blockcahins is generated for you. You have full control over this wallet, meaning you are the only person with the private keys to access it. IMPORTANT: If the private key is lost, the wallet is lost.

This one private key allows you to unlock three wallets: a bitcoin, a waves, and an ethereum wallet. After receiving your private key, you will be directed to the MAIA User Interface where you can view you balances and send assets to other users. You can find other users in the platform via the username, or send to an address.

Through the platform, you then have access to brokered contracts on the ethereum blockchain. At the moment 3 types of contracts are offered: Escrow contract, Pegger Contract, Futures/Options Contract.




##### Escrow contract
Example Problem: A salesman in Azerbaijan wishes to export tomatoes to a buyer in Germany. The buyer in Germany does not want to pay until reception of the goods, but the seller wants to have some assurance that the buyer will indeed pay upon reception of goods.
Solution: The buyer and seller enter an escrow contract. The buyer then sends the specified amount to the contract. This contract will keep the funds locked until the buyer sends the contract an 'accept' order, upon which the funds are released to the seller. If the buyer sends a 'not accept' order, the funds are locked for a specified amount of time to allow for mediation, and then returned to the buyer. These parameters are subject to customization.

##### Pegger contract:
Example Problem: A business wishes to use the benefits of a digital wallet to store assets and make payments to its employees, but does not want to have these assets stored as cryptocurrencies but stored as USD or RUB.
Solution: The Pegger contract receives ETH and gives the user an amount of tokens depending on the current ETH/USD rate. The user can then send and store these tokens which represent USD value and if they wish to redeem, they can send the token back to the contract and receive ETH in their wallet.

##### Options/Futures contract:
Example Problem: An Ecuadorian business is engaged in trade with Russia and wishes to hedge their exposure to the fluctuating ruble price, however, access to these derivatives products is costly and often unavailable.
Solution: The business can enter into call, put, or future contracts as a seller or buyer to create the desired insurance. At the moment a limited number of strikes is offered but more will be rolled out soon. For an advanced user experience for trading options, you have access to the trading platform. See below. LINKHERE

Currently the platform exists only as a webapp, but with the release of mobile apps, the aim is to become a widely-adopted service for individuals and businesses to manage their financial affairs.

## How it works

MAIA's core functionality is connecting the user to the btc, wav, and eth blockchains. The technology stack employed to achieve this appears to original, as no references to it were found at the time of this writing.

It works in the following way:

The user accesses MAIA at https://maia.moskvant.com.

This address points to a server hosted by DigitalOcean, and it returns the following html file:
* views/index.html

This file invokes, among others, the following core javascript files:
* functions.js
* socketeer.js
* bundle.js

The bundle.js file is the file used to browserify the npm module HDWalletProvider. This is what allows the user to connect to the ethereum blockchain.

### Solving the third-party provider problem.

One of the problems that ethereum dapps developers currently face is how to allow their users to seamlessly connect to the ethereum blockchain to interact with their contracts. Currently, the accepted solution is for dapps to prompt the user to install the Chrome extension MetaMask which enables a Web3 connection to the ethereum blockchain. MetaMask then allows the user to send ETH transactions and confirm actions prompted by the dapp. This is a very good solution for users who interact with the blockchain in more than one way. There are many people who are interacting with multiple dapps and it is very useful for them to be able to interact with them from one wallet accessed through a Chrome extension.

However, there is an entirely different segment of people whose main problem is not managing their dapp interaction through one wallet, but rather common financial problems such as sending and storing money for usual business affairs. For these users, installing MetaMask is an unnecessary hassle that only reduces from their main focus which is handling financial affairs.

I went behind the scenes to how MetaMask operates and found that the most important connection - the web3 connection to the blockchain - was done by a module called HDWalletProvider. Furthermore, the package that I employed to compile and test the smart contracts - truffle - worked seamlessly with HDWalletProvider. The problem with it was that HDWalletProvider is offered as an npm[] module, and not as a bundle than can be sent to the user's browser. In a continuing exploration, I found a package that allows you to do just that - make a bundle of a npm module and send it via javascript so that it runs on a user's browser. This bundle is called 'Browserify'. I used it to create a bundle of HDWalletProvider and send it to the user. This enables a web3 connection to the blockchain directly from the webapp, without necessity of a third party provider like MetaMask.

### Generating the Wallet

In addition to HDWalletProvider we are also sending the user the following libraries:
* BitcoinJS
* WavesAPI
* Web3
* ethereumjs

When the user registers a new username and password, the WavesAPI is used to generate a 12-word mnemonic. After being showed to the user, it is encrypted with the password and stored in our server. That mnemonic is then immediately used by HDWalletProvider to create a ETH address and by BitcoinJS to create a Bitcoin Address. The addresses associated with your username are also stored in our servers.

### Signing Transactions

If the user wishes to send assets to another user or interact with smart contracts, they must be able to sign transaction from their account with their private key and send those transactions to the blockchain. The above mentioned libraries are employed to generate transaction data and send it via an api.

We use the following API's to send transactions to the blockchain:
* BTC Transactions: https://api.blockcypher.com/v1/btc/test3 [TESTNET3 via BLOCKCYPHER]
* WAV Transactions: https://testnet.wavesexplorer.com/nodes [TESTNET via WAVESAPI]
* ETH Transactions: https://ropsten.infura.io/ [ROPSTEN TESTNET via INFURA]

### Interacting with Contracts

The infrastructure allows for a full-fledged interaction with any type of contract on the ethereum blockchain. However, we facilitate interaction with one of our brokered contracts. These contracts are located here:

* Escrow Contract  :
* Pegger Contract  :
* Options Contract :

### Note about security

We give the user full control over their digital assets, this means that if they loose their password or seed phrase, it is impossible to recover their wallets. All we store in our servers is user addresses and encrypted private keys to faciliate interaction among users. All transactions are done directly from the user. []

## Options Trading Platform

The options trading platform accessed via https://moskvant.com is a dedicated user interface to analyze and visualize options in an intuitive and interactive way. It is an different webapp than MAIA, although you interact with it via your eth wallet.

The options trading platform is  connected to the Moscow Exchange via a client account with a broker. Prices are updated real-time and sent to the user via a socket.io connection. The platform then has the following features to analyzie this information:

##### Sidebar and Main Views

You can see a list of all active futures in the MOEX and their respective prices on the left sidebar. Upon clicking on one of them you can see detailed information about the derived options in the main view.

##### Dynamic Chain View
In the main view, all options for all futures of a given underlying are displayed by expiration date. The user can click on an expiration date and a dropdown of all the strikes will be shown. The user can choose to display 10,30,50 or All strikes. On the center of this table is the column denoting the strike, and each row represents the call and put values for the respective strike. The calls are to the left of the strike column, and the puts are to the right. The user can choose what values to display on the table, they include market-related values such as bids and offers, as well as theoretical price calculations.

##### Black-Scholes Calculation

We built a custom math engine to support theoretical Black-Scholes calculations. The user can change input parameters and see the results for Theoretical Price, Delta, Theta, Gamma, Vega for each option. This file is in options_math.js

##### Risk Analysis
By clicking on an option in the option chain table, it adds it to the Order Tab. The Order Tab is brought up from the bottom by clicking on its Menu. A user can then build a position and analyze the exposure to the underlying in a dynamic manner.

##### Monte Carlo
We have a Monte-Carlo simulator to assist decision-making by generating random paths of an underlying to allow the calculation of probabilities.

##### Statistics
The user can view statistics regarding the entire MOEX derivatives market or for a specific underlying. There are options to view data as pie charts, bar graphs, and mixed views.






## Technology Stack

MAIA is hosted on a server hosted by DigitalOcean.

System Backend
* [Ubuntu](http://releases.ubuntu.com/16.04/) - Server OS Ubuntu v16.04
* [PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/) - Database PostgreSQL v9.6

Web-Communication
* [LetsEncrypt](https://letsencrypt.org/getting-started/) - SSL certificate for secure HTTPS Communication
* [NGINX](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) - High Performance HTTP communication handler

MAIA Web-stack (in Javascript)
* [Node](https://nodejs.org/en/blog/release/v8.5.0/) - Node.js v8.5.0 javascript server environment
* [Express](https://github.com/expressjs/express) - Web framework for Node
* [Socket.io](https://github.com/socketio/socket.io) - real-time bidirectional event-based communication between Node and Javascript in user browser
* [Web3](https://github.com/ethereum/web3.js/) - Ethereum Javascript API
* [Pm2](https://github.com/Unitech/pm2) - Node Process Manager

Options Trading Platform Web-Stack (in Python)
* [Django](https://www.djangoproject.com/download/) - Open source Python web framework
* [Gunicorn](https://pypi.org/project/gunicorn/) - Python WSGI HTTP Server for UNIX

Options Trading Data Analysis and Graphics Stack
* [Pandas](https://pandas.pydata.org/) - Python Data Analysis library (Back-end)
* [Numpy](http://www.numpy.org/) - Python Scientific Computing Library (Back-end)
* [d3](https://github.com/d3/d3) - Javascript library for Data Visualization (Front-end)
* [MathJS](http://mathjs.org/docs/getting_started.html) - extensive math library for JavaScript (Front-end)

Smart Contract Development and Testing
* [Truffle](https://github.com/trufflesuite/truffle) - Ethereum Development Framework
* [Ganache CLI](https://github.com/trufflesuite/ganache-cli) - personal blockchain for Ethereum development
* [Web3](https://github.com/ethereum/web3.js/) - Ethereum Javascript API

Blockchain API's
* [INFURA](https://ropsten.infura.io/) - API for ETH ROPSTEN TESTNET
* [BLOCKCYPHER](https://api.blockcypher.com/v1/btc/test3) - API for BTC TESTNET3
* [WAVESAPI](https://testnet.wavesexplorer.com/nodes) - API for WAV TESTNET

## Testing

Currently both the options trading platform and the wallet are in testing process. Most functionalities have been enabled, but few of them have been rigorously tested. The most urgent issues are the following:

### Urgent Tasks
#### Future/Option Contract Design
At the moment the top priority is to finish this contract design and begin testing. From then the UI to interact with it can be done.
#### Connection between wallet and options platform
This connection is yet to be enabled. At the moment both apps are running independently. Before connecting them, the design of the Future/Option Smart Contract should be finalized and tested.
### Minor Issues
#### Errors with graphing theoretical scenarios
#### Monte-Carlo migration to platform


## Author

* **Juan Bernardo Tobar** - [GitHub](https://github.com/moskvant)



## Acknowledgments

This project could not have been build without the Open-Source community. Some of the many sources used:

* [Digital Ocean Tutorials](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)
* [Smart Contract Examples]()
