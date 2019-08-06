const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("at the post get");
});
module.exports = router;
