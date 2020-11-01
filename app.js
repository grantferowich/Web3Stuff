var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const url = "https://ropsten.infura.io/v3/288bc65f9d5f47ae8486cf912ebe19dc";
const web3 = new Web3(url);

// Create Ethereum Address
// let testAccount2 = web3.eth.accounts.create();
// console.log(testAccount2);

const testAccount1 = '0xd2D43Cf78E99D31Ee1d63fD785751CB97BF33691';
const testAccount2 = '0xDF9341F8822a25e9a236e36e4e23B52fc7a6e100';

const pk1 = Buffer.from(process.env.PRIVATE_KEY_1);
const pk2 = Buffer.from(process.env.PRIVATE_KEY_2);

// create transaction object
const txObject = {
    nonce:      web3.utils.toHex(txCount),
    to:         testAccount2,
    value:      web3.utils.toHex(web3.utils.toWei( "0.1", "ether" )),
    gasLimit:   web3.utils.toHex(21000),
    gasPrice:   web3.utils.toHex(web3.utils.toWei("25", "gwei"))
}

// sign the transaction object
const tx = new Tx(txObject)
tx.sign(pk1)

const serializedTx = tx.serialize()
const raw = "0x"+ serializedTx.toString('hex')

