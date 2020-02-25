const mongoose = require("mongoose");

//Create Schema for User
const UserSchema = new mongoose.Schema({
  googleId: String,
  userName: String,
  credits: {
    type: Number, default: 0
  }
});

new mongoose.model("User", UserSchema);
