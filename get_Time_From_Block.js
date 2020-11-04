// Make sure you have Node.js installed.
// Run "node -v" in the terminal. You should see something like "v14.14.0".

// If you need to install Node.js go here: https://nodejs.org/en/download/

// Scroll down to Line 75 to change block number input parameters.
// Then run "node get_Time_From_Block.js" in the terminal.


// You will need an Infura API key. See Line 20.
// I can share it if you need one but I saved it to the local machine environment to avoid sharing the key publicly.

// -------------------------
// Dependencies
// -------------------------
require('dotenv').config();
const Web3 = require('web3')
const InfuraURL = "https://mainnet.infura.io/v3/"+process.env.INFURA_API_KEY
const web3 = new Web3(new Web3.providers.HttpProvider(InfuraURL));


// GetTime accepts one or two Block Numbers. 
// When given one number, the function logs a date and time formatted like so:

// Wed, 04 Nov 2020 14:53:00 UTC

// When two numbers are passed as arguemnts, the function logs an object like so:

// {
//     '11191313': 'Wed, 04 Nov 2020 14:53:00 UTC',
//     '11191314': 'Wed, 04 Nov 2020 14:53:12 UTC',
//     '11191315': 'Wed, 04 Nov 2020 14:53:26 UTC',
//     '11191316': 'Wed, 04 Nov 2020 14:53:28 UTC',
//     '11191317': 'Wed, 04 Nov 2020 14:53:32 UTC',
//     '11191318': 'Wed, 04 Nov 2020 14:53:47 UTC',
//     '11191319': 'Wed, 04 Nov 2020 14:53:59 UTC'
//   }

const GetTimes = async (blockNum1, blockNum2) => {
    let times = {};
   
    if (blockNum2 < blockNum1) {
        console.log("Error: Please use a range where the first block number entered as an argument is an earlier block than the second.")
        return
    }

    // Handle optional second argument, return just one date time
    if ( blockNum2 === undefined ) {
        await web3.eth.getBlock(blockNum1, (e, block) => {
            console.log("Log message: Only one block number has been entered.")
            const dateTimeStamp = block.timestamp; 
            const date = new Date(dateTimeStamp * 1000) //x1000 to convert from seconds to milliseconds 
            let s = date.toUTCString() 
            s = s.substring(0,s.indexOf("GMT")) + "UTC"
            let statement = "Date corresponding to block "+blockNum1+":"
            console.log(statement,s);
        })
    } else {
        // get the date for each block number spanning the range to construct the object
        for (let i = blockNum1; i <= blockNum2; i++){
            await web3.eth.getBlock(i, (e, block) => {
                const dateTimeStamp = block.timestamp; 
                const date = new Date(dateTimeStamp * 1000); //x1000 to convert from seconds to milliseconds 
                let s = date.toUTCString(); 
                s = s.substring(0,s.indexOf("GMT")) + "UTC";
                times[i] = s;
            })
        }
        console.log(times);
    }
}

// invoke the function with block numbers are inputted.....
GetTimes(11191313);
GetTimes(11191313,11191319);

