const mongoose = require("mongoose");
const Schema = require("../../Database/Schema/schema.json");
const SchemaObj = require("../Schema/schema");

Object.keys(Schema).forEach(element => {
    exports[Schema[element].collection] = mongoose.model(Schema[element].collection, SchemaObj[Schema[element].collection]);
});