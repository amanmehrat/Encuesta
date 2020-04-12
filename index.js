const path = require("path");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

require("./models/User");
require("./models/Survey");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const keys = require("./config/keys");

const cookieSession = require("cookie-session");
const bodyParser = require("body-parser")
//Connection For MongoDB
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected"))
  .catch(err => console.log("Caught", err.stack));

const app = express();
app.use(bodyParser.json())
app.use(cookieSession({ maxAge: 60 * 60 * 70, keys: [keys.cookieKey] }));
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);


if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, 'client/build')));//Serve Static file declaration
  app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })//Unmmapped Route build mode

}



//const { PORT = 5000 } = process.env.PORT;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening");
});
