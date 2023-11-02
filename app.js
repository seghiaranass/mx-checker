const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises; // Use the promise-based functions

const app = express();
app.use(cors());

const { processStartPoint } = require('./src/process');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // make sure this uploads folder is exist
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // using the original file name
    }
  });

  const upload = multer({ storage: storage });


app.post('/upload',upload.single('file'),async (req,res,next) =>{

    try{
        if (!req.file) {
            return res.status(400).send('No file was uploaded.');
          }

          const fullPath = `uploads/${req.file.filename}`;
          processStartPoint(fullPath, async (error) => {
            // Delete the file after processing is done or if there's an error
            try {
              await fs.unlink(fullPath);
              console.log(`Successfully deleted file: ${fullPath}`);
              if (error) {
                // If there was an error during processing, send a server error response
                return res.status(500).send('An error occurred during file processing.');
              } else {
                // If everything went fine, send a success response
                res.status(200).send('File uploaded and processed successfully.');
              }
            } catch (deleteError) {
              console.error(`An error occurred while deleting the file: ${deleteError}`);
              res.status(500).send('An error occurred during file deletion.');
            }
          });

    }catch(err){

    }


})


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});