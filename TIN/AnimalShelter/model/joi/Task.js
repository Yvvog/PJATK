const Joi = require('joi');
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "validationMessage.fieldRequired";
                break;
            case "string.min":
                err.message = "validationMessage.fieldMIN";
                break;
            case "string.max":
                err.message = "validationMessage.fieldMAX";
                break;
            case "date.min":
                err.message = "validationMessage.fieldPastDate";
                break;
            default:
                break;
        }
    });
    return errors;
}

const taskSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    Employee: Joi.string()
        .required()
        .error(errMessages),
    Dog: Joi.string()
        .required()
        .error(errMessages),
    Status: Joi.number()
        .required()
        .min(0)
        .max(10)
        //.allow("")
        //.allow(null)
        .error(errMessages),
    Descr: Joi.string()
        .min(2)
        .max(150)
        .required()
        .error(errMessages)
});

module.exports = taskSchema;