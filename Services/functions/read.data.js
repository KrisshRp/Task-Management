module.exports = async (modelObj, id = null) => {
    var data = []
    var dataKeys = Object.keys(modelObj.schema.obj);
    try {
        if (id) {
            data = await modelObj
                .find({ collection_id: id, is_delete: false })
                .sort({ createdAt: -1 });
        } else {
            data = await modelObj
                .find({ is_delete: false })
                .sort({ createdAt: -1 });
        }
        return {
            status: true,
            data: data,
            keys: dataKeys
        }
    } catch (err) {
        console.log(err);
        
        return {
            status: false,
            message: err
        }
    }
};
