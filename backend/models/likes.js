module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
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
      }
    });
  
    return Like;
  };