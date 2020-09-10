module.exports = app => {
  const router = require("express").Router();  
  
  const users = require("../controllers/users_controllers");
  const auth = require("../middleware/auth");
  const multer = require("../middleware/multer-config");
    
  
    // Sign up and create new user
    router.post("/signup", users.signup);
  
    // Login with existing user
    router.post("/login", users.login);

    // Find user by Id
    router.get("/:id",  users.findOne);

    //Update user by Id
    router.put("/:id", multer, users.updateWithImage)

    //Delete user by id
    router.delete("/:id", users.deleteWithImage)
  
    app.use('/api/users', router);
  };