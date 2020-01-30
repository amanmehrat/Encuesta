const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");
const cookieSession = require("cookie-session");

//Connection For MongoDB
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected"))
  .catch(err => console.log("Caught", err.stack));

const app = express();
app.use(cookieSession({ maxAge: 60 * 60 * 70, keys: [keys.cookieKey] }));
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

//const { PORT = 5000 } = process.env.PORT;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening");
});
