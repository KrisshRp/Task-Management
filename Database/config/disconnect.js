const mongoose = require("mongoose")

exports.disconnect = () => mongoose.disconnect().then(() => {
    console.log(`${process.env.PROJECT_NAME} database disconnceted`)
});
