const idmaker = require("./Services/modules/idMaker");
const model = require("./Database/Model/model");
require("./Bin/env/env");
require("./Database/config/connect").connect();

// var dataCount = model.Users.find({});
// console.log(model.Statuses.schema);

// const auth = require("./Services/Middleware/auth.middleware");
// console.log(auth.createToken(1, "admin", "test"));

const data = async () => {
    const user = await model.Users.findOne({ email: "krishnendu@chanakanalytics.com", is_delete: false });
    if (user) {
        console.log(user);
    } else {
        console.log("not found");
    }
}

data();