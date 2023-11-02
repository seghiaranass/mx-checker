const express = require('express');
const multer = require('multer');
const cors = require('cors');

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
          processStartPoint(fullPath).then(() => {
            res.status(200).send(`File uploaded and processed successfully: ${req.file.filename}`);
          }).catch(error => {
            res.status(500).send(`An error occurred during file processing: ${error.message}`);
          });

    }catch(err){

    }


})


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});