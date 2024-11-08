// const mongoose = require("mongodb").MongoClient;
const mongoose = require("mongoose");

exports.connect = async () => await mongoose.connect(process.env.db_url + process.env.databsename)

