module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId : {
          type: Sequelize.INTEGER(11),
          allowNull: false,
      },
      title: {
          type: Sequelize.STRING,
          allowNull: false
      },
      content: {
          type: Sequelize.TEXT("long"),
          allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  
    return Article;
  };