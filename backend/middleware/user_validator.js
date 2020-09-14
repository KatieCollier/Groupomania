const {body, validationResult} = require("express-validator");

const signupValidationRules = () => {
    return [
        body("userName").isLength({min: 3}),
        body("email").isEmail(),
        body("department").isLength({min: 3, max: 20}),
        body("password").isLength({min: 3})
    ]
}

const loginValidationRules = () => {
    return [
        body("email").isEmail(),
        body("password").isLength({min:3})
    ]
}

const editValidationRules = () => {
    return [
        body("userName").isLength({min: 3}),
        body("email").isEmail(),
        body("department").isLength({min: 3, max: 20}),
        body("password").isLength({min: 3})
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {signupValidationRules, loginValidationRules, editValidationRules, validate}