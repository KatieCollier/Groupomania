module.exports = app => {
    const users = require("../controllers/users_controllers");
  
    var router = require("express").Router();
  
    // Sign up and create new user
    router.post("/signup", users.signup);
  
    // Login with existing user
    router.post("/login", users.login);
  
    app.use('/api/users', router);
  };