module.exports = (sequelize, Sequelize) => {
    const CommentLike = sequelize.define("commentLike", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      commentId : {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
      userId : {
          type: Sequelize.INTEGER(11),
          allowNull: false
      }
    });
  
    return CommentLike;
  };