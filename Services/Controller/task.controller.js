const switchModel = require("../modules/model.switch");
const createData = require("../functions/create.data");
const updateData = require("../functions/update.data");
const deleteData = require("../functions/delete.data");
const readData = require("../functions/read.data");
const idFinder = require("../modules/id.finder");

const modelObj = switchModel("Tasks");
const taskLogModel = switchModel("TaskLogs");
const ProjectPopulate = [
    {
        path: "assignedTo",
        select: ["collection_id", "name", "role", "-_id"],
    },
    {
        path: "creator",
        select: ["collection_id", "name", "role", "-_id"],
    },
    {
        path: "brand",
        select: ["collection_id", "brandName", "brandLogo", "-_id"],
    },
    {
        path: "project",
        select: ["collection_id", "projectName", "statusList", "-_id"],
    },
    {
        path: "category",
        select: ["collection_id", "categoryTitle", "color", "-_id"],
    },
];

exports.create = async (req, res, next) => {
    var data = { ...req.body };
    data.brand = await idFinder("Brands", req.body.brand);
    data.projectManager = await idFinder("Users", req.body.assignedTo);
    data.projectCreator = await idFinder("Users", req.body.creator);
    data.statusList = await idFinder("Projects", req.body.project);
    data.projectCategory = await idFinder("Categories", req.body.category);

    req.createStatus = await createData(modelObj, data);
    next();
};

exports.update = async (req, res, next) => {
    var data = { ...req.body };
    data.brand = await idFinder("Brands", req.body.brand);
    data.projectManager = await idFinder("Users", req.body.assignedTo);
    data.projectCreator = await idFinder("Users", req.body.creator);
    data.statusList = await idFinder("Projects", req.body.project);
    data.projectCategory = await idFinder("Categories", req.body.category);
    var updateBy = await idFinder("Users", req.body.updateBy);

    var oldData = await readData(modelObj, data.collection_id, ProjectPopulate);
    req.updateStatus = await updateData(modelObj, data);
    var newData = await readData(
        taskLogModel,
        data.collection_id,
        ProjectPopulate
    );

    await createData(taskLogModel, {
        taskId: data.collection_id,
        taskInitial: oldData,
        taskUpdate: newData,
        updateBy: updateBy,
    });
    next();
};

exports.read = async (req, res) => {
    var responce = await readData(
        modelObj,
        req.params.id || null,
        ProjectPopulate
    );
    res.status(201).json({
        createStatus: req.createStatus || null,
        updateStatus: req.updateStatus || null,
        deleteStatus: req.deleteStatus || null,
        readStatus: responce,
    });
};

exports.delete = async (req, res, next) => {
    req.updateStatus = await deleteData(modelObj, req.params.id || null);
    next();
};

exports.history = async (req, res) => {
    var data = await taskLogModel
        .find({ taskId: req.params.id }, { _id: 0})
        .sort({ createdAt: -1 })
        .exec();
    res.status(201).json({
        createStatus: req.createStatus || null,
        updateStatus: req.updateStatus || null,
        deleteStatus: req.deleteStatus || null,
        readStatus: data,
    });
};
