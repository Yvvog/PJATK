const Joi = require('joi');
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "validationMessage.fieldRequired";
                break;
            case "string.pattern.base":
                err.message = "validationMessage.fieldNotNumber";
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
            case "date.format.base":
                err.message = "Incorrect data format";
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

const dogSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    DogName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    DateFrom: Joi.date()
        .min(nowString)
        .required()
        .error(errMessages),
    Healthy: Joi.string()
        .error(errMessages)
});

module.exports = dogSchema;