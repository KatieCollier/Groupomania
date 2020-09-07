const multer = require('multer');
 
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/Collier/Documents/AllDocuments/WebDeveloper/Projet_7/Groupomania-1/vue-client-frontend/public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});
 
var upload = multer({storage: storage});
 
module.exports = upload;