const switchModel = require("../modules/model.switch");
const createData = require("../functions/create.data");
const updateData = require("../functions/update.data");
const deleteData = require("../functions/delete.data");
const readData = require("../functions/read.data");

const modelObj = switchModel("Brands");

exports.create = async (req, res, next) => {
    req.createStatus = await createData(modelObj, req.body);
    next();
}

exports.update = async (req, res, next) => {
    req.updateStatus = await updateData(modelObj, req.body);
    next();
}

exports.read = async (req, res) => {
    var responce = await readData(modelObj, req.params.id || null);
    res.status(201).json({
        createStatus: req.createStatus || null,
        updateStatus: req.updateStatus || null,
        deleteStatus: req.deleteStatus || null,
        readStatus: responce,
    });
}

exports.delete = async (req, res, next) => {
    req.deleteStatus = await deleteData(modelObj, req.body || null);
    next();
}