// Joining User Table and Task Table
db.users.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "userId",
      foreignField: "creator",
      as: "tasks"
    }
  }
])

// Joining Brand Table and Project Table
db.brands.aggregate([
  {
    $lookup: {
      from: "projects",
      localField: "brandId",
      foreignField: "brandName",
      as: "projects"
    }
  }
])

// Joining Project Table and Task Table
db.projects.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "projectId",
      foreignField: "projectName",
      as: "tasks"
    }
  }
])

// Joining Task Table and Status Table
db.tasks.aggregate([
  {
    $lookup: {
      from: "statuses",
      localField: "projectName",
      foreignField: "projectName",
      as: "statuses"
    }
  }
])

// Joining Task Table and Task Log Table
db.tasks.aggregate([
  {
    $lookup: {
      from: "taskLogs",
      localField: "taskId",
      foreignField: "taskId",
      as: "taskLogs"
    }
  }
])