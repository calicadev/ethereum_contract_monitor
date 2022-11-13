const ethers = require('ethers');
const log = require('./utils/log');
const webhook = require('./utils/webhook');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const webSocketProvider = new ethers.providers.WebSocketProvider(
    process.env.ALCHEMY_WEBSOCKET
);

console.log('Starting Monitor...');

webSocketProvider.on('block', async (blockNumber) => {
    log(`New Block: ${blockNumber}`, 2);

    const { transactions } = await provider.getBlockWithTransactions(
        blockNumber
    );

    log(`Block includes ${transactions.length} transactions`, 2);

    const contractCreations = transactions.filter((tx) => {
        return tx.creates;
    });

    log(`Block includes ${contractCreations.length} contract creations`, 2);

    for (contractCreation of contractCreations) {
        webhook(
            contractCreation.blockNumber,
            contractCreation.hash,
            contractCreation.creates
        );
    }
});
