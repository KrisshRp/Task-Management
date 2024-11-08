const dataCleaner = require("../modules/data.cleaner");

module.exports = async (modelObj, data) => {
    if (!data.collection_id)
        return {
            status: false,
            message: "Data contains invalid key collection_id",
        };
    var dataObj = { ...data };
    dataObj = dataCleaner(dataObj);
    try {
        await modelObj.updateOne(
            { collection_id: data.collection_id },
            dataObj
        );
        return {
            status: true,
            message:
                "Data " +
                data.collection_id +
                " updated successfully in Collection " +
                modelObj.modelName,
        };
    } catch (err) {
        return { status: false, message: err };
    }
};
