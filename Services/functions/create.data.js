const dataCleaner = require("../modules/data.cleaner");
const idMaker = require("../modules/idMaker");

module.exports = async (modelObj, data) => {
    Object.keys(data).forEach((element) => {
        if (!Object.keys(modelObj.schema.obj).includes(element)) {
            return {
                status: false,
                message: `Data contains invalid key ${element}`,
            };
        }
    });
    var dataObj = { ...data };
    var dataCount = await modelObj.estimatedDocumentCount();
    dataObj[ 'collection_id' ] = idMaker(modelObj.modelName, dataCount);
    dataObj = dataCleaner(dataObj);
    try {
        await modelObj.create(dataObj);
        return {
            status: true,
            message: "Data "+dataObj.collection_id+" created successfully in Collection "+modelObj.modelName
        };
    } catch (err) {
        return {
            status: false,
            message: err
        };
    }
}