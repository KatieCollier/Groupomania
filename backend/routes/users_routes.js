module.exports = app => {
    const router = require("express").Router();  
  
    const users = require("../controllers/users_controllers");
    const {signupValidationRules, loginValidationRules, editValidationRules, validate} = require("../middleware/user_validator");
    
    const auth = require("../middleware/auth");
    const multer = require("../middleware/multer-config");
    
  
    // Sign up and create new User
    router.post("/signup", signupValidationRules(), validate, users.signup);
  
    // Login with existing User
    router.post("/login", loginValidationRules(), validate, users.login);

    // Find User by Id
    router.get("/:id", auth, users.findOne);

    //Update User by Id
    router.put("/:id", auth, multer, editValidationRules(), validate, users.update)

    //Delete User by id
    router.delete("/:id", auth, users.delete)
  
    app.use('/api/users', router);
  };