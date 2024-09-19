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
let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = '' + nowDate.getFullYear();

if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;
const nowString = [year, month, day].join('-');

const contrSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    Visitor: Joi.string()
        .required()
        .error(errMessages),
    Dog: Joi.string()
        .required()
        .error(errMessages),
    Date: Joi.date()
        .required()
        .min(nowString)
        .error(errMessages),
    Obligations: Joi.string()
        .min(2)
        .max(150)
        .required()
        .error(errMessages)
});

module.exports = contrSchema;