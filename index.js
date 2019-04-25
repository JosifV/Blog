require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("All Fine Mongoose Connected");
  }
});

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listenig on port " + PORT);
});
