const mongoose = require("mongoose");

//Create Schema for User
const UserSchema = new mongoose.Schema({
  googleId: String,
  userName: String
});

new mongoose.model("User", UserSchema);
