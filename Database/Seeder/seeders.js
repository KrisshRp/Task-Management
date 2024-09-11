const fs = require("fs");

require('dotenv').config()
require("./db_disconnect")

var testFolder = "./database/seeders/"

fs.readdir(testFolder, (err, files) => {
    files.forEach(async (file) => {
        if (!file.includes("^")) {
            await require(`../seeders/${file}`);
        }
    });
});

require("./db_conn")

