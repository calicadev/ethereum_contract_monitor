const axios = require('axios');
const log = require('./log');
require('dotenv').config();

module.exports = async function webhook(blockNumber, tx, contractAddress) {
    try {
        const response = await axios.post(process.env.DISCORD_WEBHOOK, {
            content: '',
            embeds: [
                {
                    title: `Found new Contract`,
                    url: `https://etherscan.io/address/${contractAddress}`,
                    footer: {
                        text: `Built by calica <3`,
                    },
                    timestamp: new Date(),
                    color: 15001324,
                    fields: [
                        {
                            name: 'Block',
                            value: blockNumber,
                            inline: true,
                        },
                        {
                            name: 'Contract Address',
                            value: contractAddress,
                            inline: true,
                        },
                        {
                            name: 'Tx',
                            value: `[Etherscan](https://etherscan.io/tx/${tx})`,
                            inline: true,
                        },
                    ],
                },
            ],
        });

        log(`${response.status} Successfully sent webhook!`, 2);
    } catch (err) {
        log('Error sending webhook', 1);
        log(err, 2);
    }
};
