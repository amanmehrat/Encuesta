const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({
    firstName: "Aman",
    lastName: "Mehrat"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening");
});
