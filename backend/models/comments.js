module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      articleId : {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
      userId : {
          type: Sequelize.INTEGER(11),
          allowNull: false,
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: false
      }
    });
  
    return Comment;
  };