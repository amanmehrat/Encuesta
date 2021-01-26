const path = require("path");
const express = require("express");
const mongoUtil = require("./db/MongoDB");
const app = express();
const cors = require('cors');

require("./models/User");
require("./models/Survey");
require("./services/passport");

app.use(cors());

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

//Connection For MongoDB
mongoUtil.connectToServer();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//app.use(cookieSession({ maxAge: 60 * 60 * 70, keys: [keys.cookieKey] }));
//app.use(passport.initialize());
//app.use(passport.session());
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
