module.exports = async (modelObj, id = null, populate = null) => {
    var data = []
    var exclude = [ "is_delete" ]
    var dataKeys = Object.keys(modelObj.schema.obj).filter(element => !exclude.includes(element));
    
    try {
        if (id) {
            data = await modelObj
                .find({ collection_id: id, is_delete: false }, { _id: 0, is_delete: 0 })
                .sort({ createdAt: -1 }).populate(populate).exec();
        } else {
            data = await modelObj
                .find({ is_delete: false }, { _id: 0, is_delete: 0 })
                .sort({ createdAt: -1 }).populate(populate).exec();
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
