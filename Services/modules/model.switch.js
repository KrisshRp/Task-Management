const model = require("../../Database/Model/model");

module.exports = (modelName) => {
    switch (modelName) {
        case "Users":
            return model.Users;
        case "Roles":
            return model.Roles;
        case "Statuses":
            return model.Statuses;
        case "Categories":
            return model.Categories;
        case "Brands":
            return model.Brands;
        case "Projects":
            return model.Projects;
        case "Tasks":
            return model.Tasks;
        case "TaskLogs":
            return model.TaskLogs;
        default:
            return model.Users;
    }
}