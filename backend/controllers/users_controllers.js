const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


/* create and export a function to create a new User (sign up) */
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) /* create a hash from the password (encrypt it) */
  .then(hash => {

    const user = {
      email: req.body.email,
      password: hash,
      userName: req.body.userName,
      department: req.body.department,
      chargeCom: req.body.chargeCom ? req.body.chargeCom: false
    };

      User.create(user) /* save the new user */
          .then(() => res.status(201).json({message: "Utilisateur créé !"}))
          .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(500).json({error}));
};

/* create and export a function to login */
exports.login = (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
  .then(user => {
    if(!user){ /* if this user does NOT exist, return an error */
        res.status(401).json({error: "Utilisateur non trouvé !"})
    }
    bcrypt.compare(req.body.password, user.password) /* if the user DOES exist, compare the password in the request to the (encrypted) password stored in the database */
        .then(valid => {
            if(!valid){ /* if these passwords do NOT match, return an error */
                res.status(401).json({error: "Mot de passe incorrecte !"});
            }
            res.status(200).json({ /* if the passwords DO match: */
                userId: user.id,
                token: jwt.sign( /* give the user a token necessary for authentication and use of the app */
                    {userId: user.id},
                    "RANDOM_SECRET_TOKEN",
                    {expiresIn: "24h"} /* this token expires in 24h as a security precaution */
                )   
            });
        })
        .catch(error => res.status(500).json({error}));
})
.catch(error => res.status(500).json({error}));     
}

// find one User by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {include: ["articles", "comments"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de trouver cet utilisateur."
      });
    });
};

//update one User by id
exports.update = (req, res) => {
  const id = req.params.id;

  const user = req.file ?
   {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`
  } : {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  }

  User.update(user, {
    where: {id: id}
  })
    .then(num => {
      if (num = 1) {
        res.send({
          message: "Votre profile a été mis à jour."
        });
      } else {
        res.send({
          message: "Nous ne pouvons mettre à jour votre profile."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de mettre à jour de votre profile."
      });
    });
};

//delete User with specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      const filename = user.imageUrl ? {
        name: user.imageUrl.split("3000/")[1]
      } : {
        name: user.imageUrl
      }
      fs.unlink(`public/${filename.name}`, () => {
        User.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Votre compte a été supprimé."
              });
            } else {
              res.send({
                message: "Echec de la supression de votre compte."
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Impossible de supprimer votre compte."
            });
          });
      })
    })
    .catch(e => {
      console.log(e)
    })
};