const dbConfig = require("../db_connexion");

const Sequelize = require("sequelize");
// create a new instance of Sequelize for this API
//defines MySQL database attributes
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

//require all necessary models
db.users = require("./user")(sequelize, Sequelize);
db.articles = require("./articles")(sequelize, Sequelize);
db.comments = require("./comments")(sequelize, Sequelize);
db.likes = require("./likes")(sequelize, Sequelize);
db.commentLikes = require("./commentLikes")(sequelize, Sequelize);

//define relations between tables
  //foreign keys allow a reliable link between tables
  /*onDelete: CASCADE means that when a user, for example, is deleted, all rows in other tables (articles, comments, likes) 
  that relate to this user by foreign key will also be deleted, avoiding any "orphan" articles for example*/

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

db.users.hasMany(db.likes, {as: "likes"}, {onDelete: 'CASCADE', hooks: true});
db.likes.belongsTo(db.users, {
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

db.comments.hasMany(db.commentLikes, {as: "commentLikes"}, {onDelete: "CASCADE", hooks: true});
db.commentLikes.belongsTo(db.comments, {
  foreignKey: "commentId",
  as: "comment"
})

db.users.hasMany(db.commentLikes, {as: "commentLikes"}, {onDelete: "CASCADE", hooks: true});
db.commentLikes.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
})

module.exports = db;