const validator = require('validator');
const dns = require('dns');
const util = require('util');


// Convert callback-based DNS functions to promises
const resolveTxtAsync = util.promisify(dns.resolveTxt);
const resolveMxAsync = util.promisify(dns.resolveMx);

async function checkGoogleWorkspace(email) {
    if (!validator.isEmail(email.trim())) {
        return false;
    }

    const domain = email.split('@')[1];

    try {
        const records = await resolveTxtAsync(domain);
        const flattenedRecords = records.flat();
        if (flattenedRecords.some(record => record.includes('include:_spf.google.com'))) {
            return true;
        }
    } catch (err) {
        // Handle the error here if necessary
    }

    try {
        const addresses = await resolveMxAsync(domain);
        if (addresses.some(address => address.exchange.includes('google') || address.exchange.includes('gmail'))) {
            return true;
        }
    } catch (err) {
        // Handle the error here if necessary
    }

    return false;
}

module.exports = {
    checkGoogleWorkspace
};