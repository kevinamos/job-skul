const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //get token from header
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (!token) {
    console.log(JSON.stringify(req.headers));
    return res
      .status(401)
      .json({ msg: "Denied. No authorization token supplied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
