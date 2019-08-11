const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const gravatar = require("gravatar");
bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const auth = require("../../middleware/auth");
//require("dotenv").config({ path: "../../.env" });
const jwtSecret = config.get("jwtSecret");

const jwt = require("jsonwebtoken");
//list all users
router.get("/all", auth, async (req, res) => {
  try {
    users = await User.find().select("-password");
    if (!users) {
      return res.status(404).send("No users found");
    }
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// User creation endpoint
router.post(
  "/",
  [
    check("Firstname", "FisrtName is required")
      .not()
      .isEmpty(),
    check("Lastname", "LastName is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password length must be >6 ").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { Lastname, Firstname, email, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //get user gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      user = new User({
        Lastname,
        Firstname,
        email,
        avatar,
        password
      });
      //Encrypt User Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //Return jwt
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(req.body);
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
