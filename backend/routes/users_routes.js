module.exports = app => {
  const router = require("express").Router();  
  
  const users = require("../controllers/users_controllers");
  const auth = require("../middleware/auth");
  
    
  
    // Sign up and create new user
    router.post("/signup", users.signup);
  
    // Login with existing user
    router.post("/login", users.login);

    // Find user by Id
    router.get("/:id", auth, users.findOne);

    //Update user by Id
    router.put("/:id", auth, users.update)

    //Delete user by id
    router.delete("/:id", auth, users.delete)
  
    app.use('/api/users', router);
  };