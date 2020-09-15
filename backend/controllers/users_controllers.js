const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require("../models");
const User = db.users;


/* create and export a function to create a new User (sign up) */
exports.signup = (req, res, next) => {
  User.findOne({where: {email: req.body.email}}) //search for any user whose email address matches the email address being used for signup
    .then(user => {
      if(user) { //if the email address is already in use, return an error
        res.status(401).json({error: "Un compte est déjà associé à cette adresse mail."})
      } else { // if this email hasn't already been used to create an account, create the account
        bcrypt.hash(req.body.password, 10) // create a hash from the password (encrypt it) 
          .then(hash => {
            //create a user with the information in the request body
            const user = {
              email: req.body.email,
              password: hash, //store the password as a hash for security reasons
              userName: req.body.userName,
              department: req.body.department,
              //set chargeCom as false by default, it cannot be set as true from the app but needs to be set directly in the database
              chargeCom: req.body.ChargeCom ? req.body.ChargeCom: false
            };
            //save new user
            User.create(user)
              .then(() => res.status(201).json({message: "Utilisateur créé !"}))
              .catch(error => res.status(400).json({error}));
          })
          .catch(err => res.status(500).json({err}));
      }
    }) 
};

// create and export a function to login (with existing User) 
exports.login = (req, res, next) => {
  User.findOne({where: {email: req.body.email}}) //find user with email matching the one used for login
  .then(user => {
    if(!user){ // if this user does NOT exist, return an error
        res.status(401).json({error: "Utilisateur non trouvé !"})
    }
    bcrypt.compare(req.body.password, user.password) // if the user DOES exist, compare the password in the request to the (encrypted) password stored in the database
        .then(valid => {
            if(!valid){ // if these passwords do NOT match, return an error
                res.status(401).json({error: "Mot de passe incorrecte !"});
            }
            res.status(200).json({ // if the passwords DO match:
                userId: user.id,
                chargeCom: user.ChargeCom,
                token: jwt.sign( // give the user a token necessary for authentication and use of the app
                    {userId: user.id},
                    "RANDOM_SECRET_TOKEN",
                    {expiresIn: "24h"} // this token expires in 24h as a security precaution
                )   
            });
        })
        .catch(err => res.status(500).json({err}));
})
.catch(err => res.status(500).json({err}));     
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
   { //define user if there is an attached image
    userName: req.body.userName,
    email: req.body.email,
    department: req.body.department,
    password: req.body.password,
    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`
  } : { //define user if there is no attached image
    userName: req.body.userName,
    email: req.body.email,
    department: req.body.department,
    password: req.body.password,
  }
  // update user with the correct id
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

  User.findByPk(id) //find the user to be deleted by id
    .then(user => {
      const filename = user.imageUrl ? { //if the user has an associated image, get its filename
        name: user.imageUrl.split("3000/")[1]
      } : {
        name: user.imageUrl
      }
      fs.unlink(`public/${filename.name}`, () => { //remove the associated image if it exists from the public folder
        User.destroy({ // delete the user with the correct id
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
    .catch(err => {
      console.log(err)
    })
};