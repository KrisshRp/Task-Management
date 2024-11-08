const database = require(process.cwd() + '/Database/config/connect');

database.connect()
    .then(() => {
        console.log(`[${process.env.PROJECT_NAME} : ${process.env.PORT}] database connceted`);
    })
    .catch((error) => {
        console.log(error);
    });