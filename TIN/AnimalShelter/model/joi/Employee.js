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

const empSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    EmpName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    EmpSurname: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    DateEmp: Joi.date()
        //.min(nowString)
        .required()
        .error(errMessages),
    EmailEmp: Joi.string()
        .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    PasswordEmp: Joi.string()
        .min(4)
        .max(16)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{4,16}$/)
        .required()
        .error(errMessages),
    formMode: Joi.string()
        .optional()
        .allow("")
        .allow(null)
});

module.exports = empSchema;