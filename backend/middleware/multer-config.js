const multer = require('multer');

const MIME_TYPES = { // the mime type dictionary will be used to give the file the correct extension
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
 
const storage = multer.diskStorage({ // storage indicates to multer where to save the files
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/"); // save files in "public" directory
  },
  filename: (req, file, cb) => { // create a unique filename for the file using its original filename and the time stamp
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension)
  }
});
 
module.exports = multer({storage: storage}).single('uploadfile');