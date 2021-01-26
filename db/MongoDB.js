const mongoose = require("mongoose");
const keys = require("../config/keys");

var _db;
module.exports = {
    connectToServer: function () {
        mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then(db => {
                _db = db
                console.log("DB Connected!");
            })
            .catch(err => console.log(err));
    },
    getDb: function () {
        console.log("Get Open Connection", _db.models);
        return _db;
    }
};