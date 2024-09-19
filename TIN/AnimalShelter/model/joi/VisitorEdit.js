const Joi = require('joi');
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "validationMessage.fieldRequired";
                break;
            case "string.pattern.base":
                err.message = "validationMessage.fieldPattern";
                break;
            case "string.min":
                err.message = "validationMessage.fieldMIN";
                break;
            case "string.max":
                err.message = "validationMessage.fieldMAX";
                break;
            case "number.min":
                err.message = "validationMessage.fieldNegativeNumber";
                break;
            case "number.max":
                err.message = "validationMessage.fieldBigNum";
                break;
            default:
                break;
        }
    });
    return errors;
}
const visSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    Name: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    Surname: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    NumberOfVisits: Joi.number()
        .optional()
        .min(0)
        .max(100)
        .allow("")
        .allow(null)
        .error(errMessages),
    Email: Joi.string()
        .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    Password: Joi.string()
        .min(4)
        .max(16)
        .allow("")
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{4,16}$/)
        .required()
        .error(errMessages),
    formMode: Joi.string()
        .optional()
        .allow("")
        .allow(null)
});

module.exports = visSchema;