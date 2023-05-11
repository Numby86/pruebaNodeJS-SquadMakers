const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:7GBDSVHdMtJTfjZY@nodejs-proyectodb.ihshpoy.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connect;
