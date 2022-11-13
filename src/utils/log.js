const colors = require('colors');

module.exports = function log(message, type = 0) {
    const ts = colors.yellow(`[${new Date().toString().split(' GMT')[0]}] `);
    let status = '';

    switch (type) {
        case 1:
            status = colors.red('[-] ');
            break;
        case 2:
            status = colors.green('[+] ');
            break;
        case 3:
            status = colors.blue('[*] ');
            break;
        default:
            status = colors.cyan('[?] ');
            break;
    }

    console.log(ts + status + message);
};
