const switchModel = require("../modules/model.switch");
const createData = require("../functions/create.data");
const updateData = require("../functions/update.data");
const deleteData = require("../functions/delete.data");
const readData = require("../functions/read.data");
const idFinder = require("../modules/id.finder");

const modelObj = switchModel("Projects");
const ProjectPopulate = [
    {
        path: "projectManager",
        select: ["collection_id", "name", "role", "-_id"]
    },
    {
        path: "projectCreator",
        select: ["collection_id", "name", "role", "-_id"]
    },
    {
        path: "brand",
        select: ["collection_id", "brandName", "brandLogo", "-_id"],
    },
    {
        path: "statusList",
        select: ["collection_id", "statusTitle", "statusList", "-_id"]
    },
    {
        path: "projectCategory",
        select: ["collection_id", "categoryTitle", "color", "-_id"]
    }
]

exports.create = async (req, res, next) => {
    var data = { ...req.body };
    data.brand = await idFinder("Brands", req.body.brand)
    data.projectManager = await idFinder("Users", req.body.projectManager)
    data.projectCreator = await idFinder("Users", req.body.projectCreator)
    data.statusList = await idFinder("Statuses", req.body.statusList)
    data.projectCategory = await idFinder("Categories", req.body.projectCategory)

    req.createStatus = await createData(modelObj, data);
    next();
}

exports.update = async (req, res, next) => {
    var data = { ...req.body };
    data.brand = await idFinder("Brands", req.body.brand)
    data.projectManager = await idFinder("Users", req.body.projectManager)
    data.projectCreator = await idFinder("Users", req.body.projectCreator)
    data.statusList = await idFinder("Statuses", req.body.statusList)
    data.projectCategory = await idFinder("Categories", req.body.projectCategory)

    req.updateStatus = await updateData(modelObj, data);
    next();
}

exports.read = async (req, res) => {
    var responce = await readData(modelObj, req.params.id || null, ProjectPopulate);
    res.status(201).json({
        createStatus: req.createStatus || null,
        updateStatus: req.updateStatus || null,
        deleteStatus: req.deleteStatus || null,
        readStatus: responce,
    });
}

exports.delete = async (req, res, next) => {
    req.updateStatus = await deleteData(modelObj, req.params.id || null);
    next();
}