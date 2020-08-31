const dbConfig = require("../db_connexion");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

if(sequelize) {
    console.log("Connecté à la base de données !")
} else {
    console.log("Erreur lors de la connexion à la base de données")
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.articles = require("./articles")(sequelize, Sequelize);
db.comments = require("./comments")(sequelize, Sequelize);
db.likes = require("./likes")(sequelize, Sequelize);

db.users.hasMany(db.articles, {as: "articles"}, {onDelete: 'CASCADE', hooks: true});
db.articles.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
})

db.users.hasMany(db.comments, {as: "comments"}, {onDelete: 'CASCADE', hooks: true});
db.comments.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
})

db.articles.hasMany(db.comments, {as: "comments"}, {onDelete: 'CASCADE', hooks: true});
db.comments.belongsTo(db.articles, {
  foreignKey: "articleId",
  as: "article"
})

db.articles.hasMany(db.likes, {as: "likes"}, {onDelete: 'CASCADE', hooks: true});
db.likes.belongsTo(db.articles, {
  foreignKey: "articleId",
  as: "article"
})

module.exports = db;