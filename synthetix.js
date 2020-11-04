const { SynthetixJs } = require('synthetix-js');
const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet
// (async function () {
//   const totalSUSD = await snxjs.sUSD.totalSupply();
//   const totalSUSDSupply = snxjs.utils.formatEther(totalSUSD);
//   console.log('sUSDTotalSupply:', totalSUSDSupply);
// })();

const getSUSDSupply = async () => {
    const totalSUSD = await snxjs.sUSD.totalSupply();
    const totalSUSDSupply = snxjs.utils.formatEther(totalSUSD)
    console.log("sUSD Total Supply", totalSUSDSupply)
}

getSUSDSupply();

