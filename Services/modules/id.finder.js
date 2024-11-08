const modelSwitch = require("../modules/model.switch");

module.exports = async (modelName, id) => { 
    return await modelSwitch(modelName).findOne({ collection_id : id }, {_id: 1});
}