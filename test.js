const idmaker = require("./Services/modules/idMaker");
const model = require("./Database/Model/model");

var data = async () => {
    await model.Users.find({}).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}

data()