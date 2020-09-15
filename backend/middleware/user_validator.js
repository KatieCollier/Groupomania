const {body, validationResult} = require("express-validator");

//validate user input for signup
const signupValidationRules = () => {
    return [
        body("userName").isLength({min: 3}), //user name must contain at least 3 characters
        body("email").isEmail(), //the email must be of a valid email form
        body("department").isLength({min: 3, max: 20}), //department must be between 3 and 20 characters long
        body("password").isLength({min: 3}) //password must be at least 3 characters long
    ]
}

//validate user input for login
const loginValidationRules = () => {
    return [
        body("email").isEmail(), //the email must be of a valid email form
        body("password").isLength({min:3}) //user name must contain at least 3 charatcers
    ]
}

//validate user input for editing profile
const editValidationRules = () => {
    return [
        body("userName").isLength({min: 3}), //user name must contain at least 3 characters
        body("email").isEmail(), //the email must be of a valid email form
        body("department").isLength({min: 3, max: 20}), //department must be between 3 and 20 characters long
        body("password").isLength({min: 3}) //password must be at least 3 characters long
    ]
}

const validate = (req, res, next) => { //validate function
    const errors = validationResult(req)
    if(errors.isEmpty()){ //if there are no validation errors, move on to next middleware
        return next()
    }
    const extractedErrors = [] //if there are errors...
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(422).json({ //... return the errors
        errors: extractedErrors,
    })
}

module.exports = {signupValidationRules, loginValidationRules, editValidationRules, validate}