require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
//connect to database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection established");
});

//get the routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
