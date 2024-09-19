const {format} = require('morgan');
const db = require('../../config/mysql2/db');
const contrSchema = require('../../model/joi/Contract');

exports.getContracts = () => {
    const query = `SELECT contr._id as contr_id,
                          contr.Date,
                          contr.Obligations,
                          dog._id as   dog_id,
                          dog.DogName,
                          dog.DateFrom,
                          dog.Healthy,
                          vis._id as   vis_id,
                          vis.Name,
                          vis.Surname,
                          vis.NumberOfVisits,
                          vis.Email,
                          vis.Password
                   FROM Contract contr
                            LEFT JOIN Dog dog on contr.Dog_id = dog._id 
    LEFT
                            JOIN Visitor vis on contr.Vis_id = vis._id`
    return db.promise().query(query)
        .then((results, fields) => {
            const contracts = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const contr = {
                    _id: row.contr_id,
                    Date: row.Date,
                    Obligations: row.Obligations,
                    Dog: {
                        _id: row.dog_id,
                        DogName: row.DogName,
                        DateFrom: row.DateFrom,
                        Healthy: row.Healthy
                    },
                    Vis: {
                        _id: row.vis_id,
                        Name: row.Name,
                        Surname: row.Surname,
                        NumberOfVisits: row.NumberOfVisits,
                        Email: row.Email,
                        Password: row.Password
                    }
                };
                contracts.push(contr);
            }
            return contracts;
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getContractById = (contractId) => {
    const query = `SELECT contr._id as contr_id,
                          contr.Date,
                          contr.Obligations,
                          dog._id as   dog_id,
                          dog.DogName,
                          dog.DateFrom,
                          dog.Healthy,
                          vis._id as   vis_id,
                          vis.Name,
                          vis.Surname,
                          vis.NumberOfVisits,
                          vis.Email,
                          vis.Password
                   FROM Contract contr
                            LEFT JOIN Dog dog on contr.Dog_id = dog._id 
    LEFT
                            JOIN Visitor vis on contr.Vis_id = vis._id 
    WHERE contr._id = ?`
    return db.promise().query(query, [contractId])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return {};
            }
            const contr = {
                _id: contractId,
                Date: row.Date,
                Obligations: row.Obligations,
                Dog: {
                    _id: row.dog_id,
                    DogName: row.DogName,
                    DateFrom: row.DateFrom,
                    Healthy: row.Healthy
                },
                Vis: {
                    _id: row.vis_id,
                    Name: row.Name,
                    Surname: row.Surname,
                    NumberOfVisits: row.NumberOfVisits,
                    Email: row.Email,
                    Password: row.Password
                }
            };
            return contr;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.createContract = (data) => {
    const vContr = contrSchema.validate(data, {abortEarly: false});
    if (vContr.error) {
        return Promise.reject(vContr.error);
    }

    const Date = data.Date;
    const Obligations = data.Obligations;
    const Dog = data.Dog;
    const Visi = data.Visitor;
    const sql = 'INSERT into Contract (Date, Obligations, Dog_id, Vis_id) VALUES (?,?,?,?)';
    return db.promise().execute(sql, [Date, Obligations, Dog, Visi]);
};
exports.updateContract = (contractId, data) => {
    const vContr = contrSchema.validate(data, {abortEarly: false});
    if (vContr.error) {
        return Promise.reject(vContr.error);
    }
    const Date = data.Date;
    const Obligations = data.Obligations;
    const sql = 'UPDATE Contract set Date = ?, Obligations = ?, Dog_id = ?, Vis_id = ? WHERE _id = ?';
    return db.promise().execute(sql, [Date, Obligations, data.Dog, data.Visitor, contractId]);
};
exports.deleteContract = (contractId) => {
    const sql = 'DELETE FROM Contract WHERE _id = ?'
    return db.promise().execute(sql, [contractId]);
};
exports.deleteManyContracts = (contractIds) => {
    const sql = 'DELETE FROM Contract WHERE _id IN (?)'
    return db.promise().execute(sql, [contractIds]);
};