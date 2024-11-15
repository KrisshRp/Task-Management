module.exports = async (modelObj, data) => {
    if (!data.collection_id)
        return {
            status: false,
            message: "Data contains invalid key collection_id",
        };
    try {
        await modelObj.updateOne({ collection_id: data.collection_id }, { is_delete: true });
        return {
            status: true,
            message:
                "Data " +
                data.collection_id +
                " deleted successfully from Collection " +
                modelObj.modelName,
        };
    } catch (err) {
        return { status: false, message: err };
    }
};
