const {format} = require('morgan');
const db = require('../../config/mysql2/db');
const visSchema = require('../../model/joi/Visitor');
const visSchemaEdit = require('../../model/joi/VisitorEdit');
const authUtil = require('../../utils/authUtils');
exports.getVisitors = () => {
    return db.promise().query('SELECT * FROM Visitor')
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.getVisitorById = (visitorId) => {
    const query = 'SELECT vis._id as _id, vis.Name, vis.Surname, vis.NumberOfVisits, vis.Email, vis.Password, contr._id as contr_id, contr.Date, contr.Obligations, dog._id as dog_id, dog.DogName, dog.DateFrom, dog.Healthy FROM Visitor vis LEFT JOIN Contract contr on contr.Vis_id=vis._id left join Dog dog on contr.Dog_id=dog._id where vis._id = ?'
    return db.promise().query(query, [visitorId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const Vis = {
                _id: parseInt(visitorId),
                Name: firstRow.Name,
                Surname: firstRow.Surname,
                NumberOfVisits: firstRow.NumberOfVisits,
                Email: firstRow.Email,
                Password: firstRow.Password,
                contracts: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.contr_id) {
                    const contr = {
                        _id: row.contr_id,
                        Date: row.Date,
                        Obligations: row.Obligations,
                        Dog: {
                            _id: row.dog_id,
                            DogName: row.DogName,
                            DateFrom: row.DateFrom,
                            Healthy: row.Healthy
                        }
                    };
                    Vis.contracts.push(contr);
                }
            }
            //console.log(Vis.contracts);
            return Vis;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.createVisitor = (visitorData) => {
    const vVis = visSchema.validate(visitorData, {abortEarly: false});
    if (vVis.error) {
        return Promise.reject(vVis.error);
    }
    return visCheckEmailUnique(visitorData.Email)
        .then(emailErr => {
            if (Object.entries(emailErr).length !== 0) {
                return Promise.reject(emailErr);
            } else {
                const Name = visitorData.Name;
                const Surname = visitorData.Surname;
                var NumberOfVisits;
                if (visitorData.NumberOfVisits == 0) {
                    NumberOfVisits = null;
                } else {
                    NumberOfVisits = visitorData.NumberOfVisits;
                }
                const Email = visitorData.Email;
                var Password = visitorData.Password;
                const passHash = authUtil.hashPassword(Password);

                const sql = 'INSERT INTO Visitor(Name, Surname, NumberOfVisits, Email, Password) VALUES (?,?,?,?,?)';
                return db.promise().execute(sql, [Name, Surname, NumberOfVisits, Email, passHash]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });

};
exports.updateVisitor = (visitorId, visitorData) => {
    const vVis = visSchemaEdit.validate(visitorData, {abortEarly: false});
    if (vVis.error) {
        return Promise.reject(vVis.error);
    }
    //console.log("checkEmailUnique: " + checkEmailUnique(visitorData.Email, visitorId));
    console.log(visitorData.Email + " " + visitorId);
    return visCheckEmailUnique(visitorData.Email, visitorId)
        .then(emailErr => {
            console.log("Object length: " + Object.entries(emailErr).length);
            if (Object.entries(emailErr).length !== 0) {
                return Promise.reject(emailErr);
            } else {
                console.log("else");
                const Name = visitorData.Name;
                const Surname = visitorData.Surname;
                var NumberOfVisits;
                if (visitorData.NumberOfVisits == 0) {
                    NumberOfVisits = null;
                } else {
                    NumberOfVisits = visitorData.NumberOfVisits;
                }
                const Email = visitorData.Email;
                var sql;
                if (visitorData.Password == "" || visitorData.Password == null) {
                    sql = 'UPDATE Visitor set Name = ?, Surname = ?, NumberOfVisits = ?, Email = ? where _id = ?';
                    return db.promise().execute(sql, [Name, Surname, NumberOfVisits, Email, visitorId]);
                } else {
                    const passHash = authUtil.hashPassword(visitorData.Password);
                    const sql = 'UPDATE Visitor set Name = ?, Surname = ?, NumberOfVisits = ?, Email = ?, Password = ? where _id = ?';
                    return db.promise().execute(sql, [Name, Surname, NumberOfVisits, Email, passHash, visitorId]);
                }

            }
        })
        .catch(err => {
            console.log("error");
            return Promise.reject(err);
        });
};
exports.deleteVisitor = (visitorId) => {
    const sql1 = 'DELETE FROM Contract where Vis_id = ?'
    const sql2 = 'DELETE FROM Visitor where _id = ?'
    return db.promise().execute(sql1, [visitorId])
        .then(() => {
            return db.promise().execute(sql2, [visitorId])
        });
};
visCheckEmailUnique = (Email, visId) => {
    console.log("entered visCheckEmailUnique");
    let sql, promise;
    if (visId) {
        sql = `SELECT COUNT(1) as c
               FROM Visitor
               where _id != ? and Email = ?`;
        console.log("1 visId");
        promise = db.promise().query(sql, [visId, Email]);

    } else {
        sql = `SELECT COUNT(1) as c
               FROM Visitor
               where Email = ?`;
        console.log("2 visId");
        promise = db.promise().query(sql, [Email]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['Email'],
                    message: 'The entered email address is already in use.'
                }]
            };
        }
        return err;
    });
};
exports.findByEmail = (Email) => {
    const sql = `SELECT vis._id as _id, vis.Name, vis.Surname, vis.NumberOfVisits, vis.Email, vis.Password
                 FROM Visitor vis
                 where vis.Email = ?`;
    return db.promise().execute(sql, [Email])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const Vis = {
                _id: parseInt(firstRow._id),
                Name: firstRow.Name,
                Surname: firstRow.Surname,
                NumberOfVisits: firstRow.NumberOfVisits,
                Email: firstRow.Email,
                Password: firstRow.Password,
                contracts: []
            }
            console.log("repository vis " + Vis.Name);
            return Vis;
        })
};