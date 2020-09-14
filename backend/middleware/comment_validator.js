const {body, validationResult} = require("express-validator");

const commentValidationRules = () => {
    return [
        body("content").not().isEmpty(),
        body("userId").isNumeric(),
        body("articleId").isNumeric()
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

module.exports = {commentValidationRules, validate}