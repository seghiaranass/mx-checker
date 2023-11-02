const fs = require('fs');
const readline = require('readline');

/**
 * Reads accounts from the given file.
 * @param {string} filename - The name of the file to read.
 * @returns {Promise<Array>} An array of account details.
 */
async function readAccountsFromFile(filename) {
    return new Promise((resolve, reject) => {
        const lines = [];
        const fileStream = fs.createReadStream(filename);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            lines.push(line.split(':'));
        });

        rl.on('close', () => {
            resolve(lines);
        });

        rl.on('error', (err) => {
            reject(err);
        });
    });
}

const processLines = async (lines,checkGoogleWorkspace,mx_records_google) =>{

    await Promise.all(lines.map(async line =>{
        const isGmail = await checkGoogleWorkspace(line[0]);
        await mx_records_google('emails.txt', line[0] + ":" + line[1], isGmail);
    }))
}



module.exports = {
    readAccountsFromFile,
    processLines
};
