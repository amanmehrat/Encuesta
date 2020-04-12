const mongoose = require('mongoose');
const recipient = require("./Recipient");

const surveySchema = new mongoose.Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [recipient],//Array
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: {//ObjectId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastRespondedOn: Date
});

mongoose.model("Survey", surveySchema);