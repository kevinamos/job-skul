require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5001;
const app = express();
app.use(express.json());
//connect to database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection established");
});
//get the routes
app.use("/api/users", require("./routes/api/users"));
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
