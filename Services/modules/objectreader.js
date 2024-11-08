const mongoose = require("mongoose");

module.exports = (data) => {
    for (let key in data.schema) {
        if (data.schema[key].type === 'ObjectId') {
            data.schema[key].type = mongoose.Schema.Types.ObjectId;
        }
    }
    return data
}