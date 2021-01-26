const { getDb } = require('./MongoDB');
const mongoose = require("mongoose");

const getNextSequence = async (name) => {
    let Counter;
    try {
        Counter = mongoose.model('Counter');
    } catch (error) {
        Counter = mongoose.model('Counter', mongoose.Schema({ _id: String, seq: Number }));
    }
    try {
        let updatedDoc = await Counter.findOneAndUpdate(
            { _id: name },
            { $inc: { seq: 1 } },
            {
                new: true,
                upsert: true
            }
        )
        if (updatedDoc) {
            return updatedDoc.seq;
        }
        return undefined;
    } catch (ex) {
        return undefined
    }
}

module.exports = getNextSequence;