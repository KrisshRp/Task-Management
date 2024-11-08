const mongoose = require("mongoose");
const Schema = require("../../Database/Schema/schema.json");
const objectReader = require("../../Services/modules/objectreader");


Object.keys(Schema).forEach(element => {
    schemaJson = objectReader(Schema[element].schema);
    exports[ Schema[ element ].collection ] = new mongoose.Schema(schemaJson,
        {
            timestamps: true,
            versionKey: false,
        }
    );
});
