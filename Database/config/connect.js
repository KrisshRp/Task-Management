const mongoose = require("mongodb").MongoClient;

exports.connect = () => mongoose.connect(process.env.db_url + process.env.databsename, {
        useUnifiedTopology: process.env.useTopology,
        useNewUrlParser: process.env.useNewUrl,
    })

