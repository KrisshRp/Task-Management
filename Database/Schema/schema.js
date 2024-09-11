const mongoose = require("mongoose");
const Schema = require("../../Database/Schema/schema.json");

Object.keys(Schema).forEach(element => {
    exports[Schema[element].collection] = new mongoose.Schema(Schema[element].schema);
});
