// --------------------------------
// Project Initilization 
// --------------------------------
const Web3 = require('web3');
const rpcURL = "https://mainnet.infura.io/v3/288bc65f9d5f47ae8486cf912ebe19dc";
const web3 = new Web3(rpcURL);
const address = "0xbC07B76e4C63E7B91c6E0395312D88D20449b106";


// Log the ETH balance from an address
web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("Balance:",balance)
  })