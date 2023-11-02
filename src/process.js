const { readAccountsFromFile,processLines } = require('./fileOps');
const { checkGoogleWorkspace } = require('./emailOps');
const { mx_records_google } = require('./dbHandler');

const processStartPoint = async (filename,onProcessedCallback) => {
  try {
    let lines = await readAccountsFromFile(filename);
    processLines(lines,checkGoogleWorkspace,mx_records_google).then(()=>{
        console.log("Done")
        if (onProcessedCallback) onProcessedCallback();
    }) 
  } catch (error) {
    console.error("An error occurred:", error);
    if (onProcessedCallback) onProcessedCallback(error);
  }
};



module.exports = {
  processStartPoint,
};
