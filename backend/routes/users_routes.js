module.exports = app => {
    const router = require("express").Router();  
  
    const users = require("../controllers/users_controllers");
    
    const auth = require("../middleware/auth");
    const multer = require("../middleware/multer-config");
    
  
    // Sign up and create new User
    router.post("/signup", users.signup);
  
    // Login with existing User
    router.post("/login", users.login);

    // Find User by Id
    router.get("/:id", auth, users.findOne);

    //Update User by Id
    router.put("/:id", auth, multer, users.update)

    //Delete User by id
    router.delete("/:id", auth, users.delete)
  
    app.use('/api/users', router);
  };