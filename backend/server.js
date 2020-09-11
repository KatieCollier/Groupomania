const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const path = require("path");

const app = express();

/* set hearders to avoid CORS errors */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//set base directory and a static public folder in which to store uploaded images
global.__basedir = __dirname;
app.use(express.static('public'));

//synchronise tables
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//require necessary routes
require("./routes/users_routes")(app);
require("./routes/articles_routes")(app);
require("./routes/comments_routes")(app);
require("./routes/likes_routes")(app);
require("./routes/commentLikes_routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
