module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(35),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING(35),
      allowNull: false,
      unique: true
    },
    department: {
        type: Sequelize.STRING(35),
    },
    profilePic: {
        type: Sequelize.STRING,
    },
    ChargeCom: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    }, 
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return User;
};