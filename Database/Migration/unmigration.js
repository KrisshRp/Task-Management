const fs = require('fs');

require(process.cwd() + "/Bin/env/env");
const connect = require(process.cwd() + "/Database/config/connect");
const disconnect = require(process.cwd() + "/Database/config/disconnect");
const Schema = require(process.cwd() + "/Database/Schema/schema.json");

connect.connect()
    .then((db) => {
        console.log(`${process.env.databsename} database connceted`);
        Object.keys(Schema).forEach(element => {
            db.db(process.env.databsename).collection(Schema[ element ].collection).drop((err, result) => {
                if (err) throw err;
                if (result) console.log(`${tablename} Collection is Deleted!`);
                db.close();
            })
        });
    })
    .catch((error) => {
        console.log(error);
    })

disconnect.disconnect();