const fs = require('fs');
 
const db = require('../models');
const Image = db.images;
 
// Upload a Multipart-File then saving it to MySQL database
exports.upload = (req, res) => {  
  Image.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: fs.readFileSync('C:/Users/Collier/Documents/AllDocuments/WebDeveloper/Projet_7/Groupomania-1/vue-client-frontend/public/images/' + req.file.filename)
  }).then(image => {
    try{
      fs.writeFileSync('C:/Users/Collier/Documents/AllDocuments/WebDeveloper/Projet_7/Groupomania-1/vue-client-frontend/public/images/' + image.name, image.data);    
      
      // exit node.js app
      res.json({'msg': 'File uploaded successfully!', 'file': req.file});
    }catch(e){
      console.log(e);
      res.json({'err': e});
    }
  })
};