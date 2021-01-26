const mongoose = require("mongoose");

//Create Schema for User
// const UserSchema = new mongoose.Schema({
//   googleId: String,
//   userName: String,
//   credits: {
//     type: Number, default: 0
//   }
// });

const UserSchema = mongoose.Schema({
  UserId: {
    type: Number,
    required: true,
    unique: true
  },
  Name: String,
  Email: String,
  Password: String,
  Credits: {
    type: Number,
    default: 0
  },
  Origin: String
});

new mongoose.model("User", UserSchema);

