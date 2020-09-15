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
      unique: true //email unique as only one account can be made per email address
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING(35),
      allowNull: false,
      unique: true //user name must be unique to avoid confusion
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