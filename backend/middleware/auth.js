const jwt = require("jsonwebtoken"); // import jsonwetoken necessary to create a token for authentication

// create authentication middleware
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization; // extract token from the authorization header of the request
        const decodedToken = jwt.verify(token, "RANDOM_SECRET_TOKEN"); // check if token is valid
        const userId = decodedToken.userId;
        if(req.body.userID && req.body.userId !== userId){ // if token NOT valid, return an error message
            throw "Identifiant non valable !"
        } else { // if the token is valid, carry on with the next middleware - must be placed before all othe middleware to protect the path 
            next();
        }
    } catch(err) {
        res.status(401).json({error: err | "Requête non authentifiée !"});
    }
};