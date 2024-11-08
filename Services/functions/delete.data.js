module.exports = async (modelObj, id) => {
    try {
        if (id) { 
            await modelObj.updateOne({ collection_id: id }, { is_delete: true });
            return {
                status: true,
                message:
                    "Data " +
                    id +
                    " deleted successfully from Collection " +
                    modelObj.modelName,
            };
        } else {
            return {
                status: false,
                message: "Data contains invalid key collection_id",
            };
        }
    } catch (err) {
        return { status: false, message: err };
    }
};
