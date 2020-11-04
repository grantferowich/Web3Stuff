// ----------
// Dependencies and Settings
// ----------
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const url = "https://ropsten.infura.io/v3/288bc65f9d5f47ae8486cf912ebe19dc";
const web3 = new Web3(url);
require('dotenv').config();

// Create Ethereum Address
// let testAccount2 = web3.eth.accounts.create();
// console.log(testAccount2);

const testAccount1 = '0xd2D43Cf78E99D31Ee1d63fD785751CB97BF33691';
const testAccount2 = '0xDF9341F8822a25e9a236e36e4e23B52fc7a6e100';

const pk1 = Buffer.from(process.env.PRIVATE_KEY_1.substring(2), 'hex');
const pk2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');

web3.eth.getTransactionCount( testAccount1, (err, txCount) => {

    // create transaction object
    // const txObject = {
    //         nonce:      web3.utils.toHex(txCount),
    //         to:         testAccount2,
    //         value:      web3.utils.toHex(web3.utils.toWei( '0.1', 'ether' )),
    //         gasLimit:   web3.utils.toHex(21000),
    //         gasPrice:   web3.utils.toHex(web3.utils.toWei('25', 'gwei'))
    // }
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('15', 'gwei')),
        data: data
      }
    console.log("txObject: ",txObject)

    // sign the transaction object
    const tx = new Tx(txObject, {'chain':'ropsten'})
    tx.sign(pk1)

    // Serialize the tx object
    const serializedTx = tx.serialize()

    // Add "0x" to the front
    const raw = "0x"+ serializedTx.toString('hex')
    // const raw = serializedTx.toString('hex')
        // console.log("raw: ", raw)
    // broadcast txn
    web3.eth.sendSignedTransaction(raw)
    .then( receipt => {
        console.log('Receipt: ',receipt)
    })
    .catch( err => {
        console.log('error broadcasting txn: ', err)
    })

})
