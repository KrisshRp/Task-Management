const app = require('./app');
const apiPrefix = process.env.API_PRIFIX;

app.use(`/${apiPrefix}/brand`, require('./Services/Router/brand.router'));
app.use(`/${apiPrefix}/category`, require('./Services/Router/category.router'));
app.use(`/${apiPrefix}/role`, require('./Services/Router/role.router'));
app.use(`/${apiPrefix}/status`, require('./Services/Router/status.router'));
app.use(`/${apiPrefix}/user`, require('./Services/Router/user.router'));
app.use(`/${apiPrefix}/project`, require('./Services/Router/project.router'));
app.use(`/${apiPrefix}/task`, require('./Services/Router/task.router'));

app.get(`${apiPrefix}/*`, (req, res, next) => {
    res.status(404).send("Not Found");
})

module.exports = app;