const {format} = require('morgan');
const db = require('../../config/mysql2/db');
const dogSchema = require('../../model/joi/Dog');
exports.getDogs = () => {
    return db.promise().query('SELECT * FROM Dog')
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};
exports.getDogById = (dogId) => {
    const query = 'SELECT dog._id as _id, dog.DogName, dog.DateFrom, dog.Healthy, contr._id as contr_id, contr.Date, contr.Obligations, vis._id as vis_id, vis.Name, vis.Surname, vis.NumberOfVisits FROM Dog dog LEFT JOIN Contract contr on contr.Dog_id=dog._id left join Visitor vis on contr.Vis_id=vis._id where dog._id = ?;'
    return db.promise().query(query, [dogId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const dog = {
                _id: parseInt(dogId),
                DogName: firstRow.DogName,
                DateFrom: firstRow.DateFrom,
                Healthy: firstRow.Healthy,
                contracts: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.contr_id) {
                    const contr = {
                        _id: row.contr_id,
                        Date: row.Date,
                        Obligations: row.Obligations,
                        Vis: {
                            _id: row.vis_id,
                            Name: row.Name,
                            Surname: row.Surname,
                            NumberOfVisits: row.NumberOfVisits
                        }
                    };
                    dog.contracts.push(contr);
                }
            }
            return dog;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.createDog = (newDogData) => {
    const vDog = dogSchema.validate(newDogData, {abortEarly: false});
    if (vDog.error) {
        return Promise.reject(vDog.error);
    }
    const DogName = newDogData.DogName;
    const DateFrom = newDogData.DateFrom;
    var Healthy = newDogData.Healthy;
    if (Healthy == null) {
        Healthy = 'off'
    }
    const sql = 'INSERT INTO Dog(DogName, DateFrom, Healthy) VALUES (?,?,?)'
    return db.promise().execute(sql, [DogName, DateFrom, Healthy]);
};
exports.updateDog = (dogId, dogData) => {
    const vDog = dogSchema.validate(dogData, {abortEarly: false});
    if (vDog.error) {
        return Promise.reject(vDog.error);
    }
    console.log(dogData);
    const DogName = dogData.DogName;
    const DateFrom = dogData.DateFrom;
    var Healthy;
    if (dogData.Healthy == null) {
        Healthy = 'off';
    } else {
        Healthy = 'on';
    }
    const sql = 'UPDATE Dog set DogName = ?, DateFrom = ?, Healthy = ? where _id = ?';
    return db.promise().execute(sql, [DogName, DateFrom, Healthy, dogId]);
};
exports.deleteDog = (dogId) => {
    const sql1 = 'DELETE FROM Contract where Dog_id = ?'
    const sql2 = 'DELETE FROM Dog where _id = ?'
    return db.promise().execute(sql1, [dogId])
        .then(() => {
            return db.promise().execute(sql2, [dogId])
        });
};
exports.healDog = (dogId) => {
    const sql = 'UPDATE Dog set Healthy = "on" where _id = ?';

    return db.promise().execute(sql, [dogId]);
};
exports.walkDog = (dogId, namee) => {
    const sql = 'UPDATE Visitor set NumberOfVisits = (NumberOfVisits+1) where _id=(SELECT vis._id FROM Contract contr LEFT JOIN Dog dog on contr.Dog_id=dog._id LEFT JOIN Visitor vis on contr.Vis_id=vis._id where dog._id= ? && vis.Name = ?)';
    return db.promise().execute(sql, [dogId, namee]);
};
// exports.walkCheckNumOfVisNullDog = (dogId) => {
//     const sql = 'SELECT vis.NumberOfVisits FROM Contract contr LEFT JOIN Dog dog on contr.Dog_id=dog._id LEFT JOIN Visitor vis on contr.Vis_id=vis._id where dog._id= ? ';
//     return db.promise().execute(sql, [dogId]);
// };
// exports.walkNumOfVisNullDog = (dogId) => {
//     const sql = 'UPDATE Visitor set NumberOfVisits = 1 where _id=(SELECT vis._id FROM Contract contr LEFT JOIN Dog dog on contr.Dog_id=dog._id LEFT JOIN Visitor vis on contr.Vis_id=vis._id where dog._id= ? )';
//     return db.promise().execute(sql, [dogId]);
// };