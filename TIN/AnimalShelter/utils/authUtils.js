const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}
exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}
exports.permitAuthentificatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    } else {
        throw new Error('Unauthorized access');
    }
}
exports.permitEmployee = (req, res, next) => {
    const empi = req.session.empi;
    const admin = req.session.admin;
    if (empi || admin) {
        next();
    } else {
        throw new Error('Unauthorized access');
    }
}