const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Profile = require("../../models/Profile");
const user = require("../../models/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
mongoose.set("useFindAndModify", false); //remove deprecation warning

router.get("/", (req, res) => {
  res.send("at the post profile");
});
//protect the router with wuth middleware to ensure only loged in users can acces it
router.get("/me", auth, async (req, res) => {
  try {
    profile = await Profile.findOne({ user: req.user.id }).populate("user", [
      "name",
      "avatar"
    ]);
    if (!profile) {
      res.status(400).json({ msg: "No profile for the User" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//route to creat a profile

router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required")
        .not()
        .isEmpty(),
      check("skills", "skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    const profilefileds = {};
    profilefileds.user = req.user.id;
    if (company) profilefileds.company = company;
    if (website) profilefileds.website = website;
    if (location) profilefileds.location = location;
    if (bio) profilefileds.bio = bio;
    if (status) profilefileds.status = status;
    if (githubusername) profilefileds.githubusername = githubusername;
    if (skills)
      profilefileds.skills = skills.split(",").map(skill => skill.trim());
    //console.log(profilefileds.skills);
    // res.send(profilefileds.skills);
    profilefileds.social = {};
    if (youtube) profilefileds.social.youtube = youtube;
    if (facebook) profilefileds.social.facebook = facebook;
    if (twitter) profilefileds.social.location = twitter;
    if (instagram) profilefileds.social.instagram = instagram;
    if (linkedin) profilefileds.social.linkedin = linkedin;
    let profile = await Profile.findOne({ user: req.user.id });
    try {
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefileds },
          { new: true }
        );
        return res.json(profile);
      }
      //create a user profile
      profile = new Profile(profilefileds);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
