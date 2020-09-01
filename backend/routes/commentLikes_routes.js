module.exports = app => {
    const commentLikes = require("../controllers/commentLikes_controllers");
  
    var router = require("express").Router();
  
    // Create a new Like
    router.post("/", commentLikes.create);

    //Find Likes by comment id
    router.get("/comments/:id", commentLikes.findByCommentId);
  
    // Retrieve all commentLikes
    router.get("/", commentLikes.findAll);
  
    app.use('/api/commentLikes', router);
  };