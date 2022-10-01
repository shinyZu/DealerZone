const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create a storage object with a given configuration
const gfsStorage = new GridFsStorage({
  url: process.env.URL,
  file: (req, file) => {
    const match = ["image/png", "image/jpeg" /* , "image/jpg" */];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "assets",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

// Set multer storage engine to the newly created object
const upload = multer({ storage: gfsStorage });

// module.exports = multer({ storage: gfsStorage });
module.exports = upload;

/* 
Multer 
    - is a nodejs middleware used for uploading files.

multer-gridfs-storage 
    - a storage engine for multer to store uploaded files directly to mongoDB.

gridfs-stream 
    - to easily stream files to and from MongoDB GridFS.
*/
