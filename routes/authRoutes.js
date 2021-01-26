const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const keys = require("../config/keys");
const getNextSequence = require("../db/DButils");

const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });


  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/register", async (req, res) => {
    const user = req.body;
    //check if user exists with emailid
    const existingUser = await User.findOne({ Email: user.email.toLowerCase() }).exec();
    if (existingUser) {
      return res.status(409).send({ error: "email already exists" });
    }

    //hash password
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        return res.status(500).send({ error: "unable to generate hash" });
      }
      getNextSequence("user_id")
        .then(countedvalue => {
          const newUser = new User({
            UserId: countedvalue,
            Name: user.name,
            Email: user.email.toLowerCase(),
            Password: hash,
            origin: "DIRECT_LOGIN"
          });
          newUser.save()
            .then(user => {
              let { _id, UserId, Name, Email, Credits } = user;
              let token = jwt.sign({ data: { _id, UserId } }, keys.JWTSecretKey, { expiresIn: 60 });
              res.status(200).send({ "token": token, "user": { _id, UserId, Name, Email, Credits } });
            })
            .catch(err => {
              return res.status(500).send({ error: "Unable to register user" });
            });
        })
        .catch(err => {
          return res.status(500).send({ error: "Unable to register user" });
        })
      // Store hash in your password DB.
    });
  });
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    //check if user exists with emailid
    const existingUser = await User.findOne({ Email: email.toLowerCase() }).exec();
    if (!existingUser) {
      return res.status(405).send({ error: "user doesn't exists" });
    }
    //compare password
    const match = await bcrypt.compare(password, existingUser.Password);
    if (!match) {
      return res.status(405).send({ error: "password doesn't match" });
    }

    try {
      const { _id, UserId, Name, Email, Credits } = existingUser;
      const token = jwt.sign({ data: { _id, UserId } }, keys.JWTSecretKey, { expiresIn: 60 });
      res.status(200).send({ "token": token, "user": { _id, UserId, Name, Email, Credits } });
    } catch (error) {
      return res.status(500).send({ error: "Unable to login user" });
    }
  })
  app.get("/api/fetchuser", requireLogin, async (req, res) => {
    const { _id } = req.user;
    //check if user exists with emailid
    const existingUser = await User.findById(_id).exec();
    if (!existingUser) {
      return res.status(405).send({ error: "user doesn't exists" });
    }
    try {
      const { _id, UserId, Name, Email, Credits } = existingUser;
      const token = jwt.sign({ data: { _id, UserId } }, keys.JWTSecretKey, { expiresIn: 60 });
      res.status(200).send({ "token": token, "user": { _id, UserId, Name, Email, Credits } });
    } catch (error) {
      return res.status(500).send({ error: "Unable to login user" });
    }
  })
};
