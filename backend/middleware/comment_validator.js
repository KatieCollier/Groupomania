const {body, validationResult} = require("express-validator");

//validate user inuput for comments
const commentValidationRules = () => {
    return [
        body("content").not().isEmpty(), //comments must have a content
        body("userId").isNumeric(), // the userId of the comments's author must be numeric
        body("articleId").isNumeric() // the articleId of the comments's associated article must be numeric
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

module.exports = {commentValidationRules, validate}