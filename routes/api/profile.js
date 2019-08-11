const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Profile = require("../../models/Profile");
const user = require("../../models/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
mongoose.set("useFindAndModify", false); //remove deprecation warning
router.get("/", auth, async (req, res) => {
  return res.json("working");
});
//get all user profiles
router.get("/all", auth, async (req, res) => {
  try {
    profile = await Profile.find().populate("User", [
      "Firstname",
      "Lastname",
      "skills",
      "education",
      "projects",
      "avatar"
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "No user profiles" });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

//get profile for specific user
router.get("/:id", auth, async (req, res) => {
  try {
    profile = await Profile.findOne({ user: req.user.id }).populate("User", [
      "Firstname",
      "Lastname",
      "skills",
      "education",
      "projects",
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

//profile delete
router.get("/delete/:id", (req, res) => {
  res.send("at get users route");
});
//protect the router with wuth middleware to ensure only loged in users can acces it
router.get("/me", auth, async (req, res) => {
  try {
    profile = await Profile.findOne({ user: req.user.id }).populate("User", [
      "Firstname",
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
      check("institution", "institution of study required")
        .not()
        .isEmpty(),
      check("levelofStudy", "level of Study required")
        .not()
        .isEmpty(),
      check("course", "course is required")
        .not()
        .isEmpty(),
      check("yearofStudy", "year of Study is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
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
    try {
      const {
        institution,
        website,
        education,
        bio,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        githubusername,
        course,
        levelofStudy,
        yearofStudy,
        fieldofstudy
      } = req.body;
      const profilefileds = {};
      console.log(1);
      profilefileds.user = req.user.id;
      if (githubusername) profilefileds.githubusername = githubusername;
      if (education) profilefileds.education = education;
      if (website) profilefileds.website = website;
      if (bio) profilefileds.bio = bio;
      if (githubusername) profilefileds.githubusername = githubusername;
      if (skills)
        profilefileds.skills = skills.split(",").map(skill => skill.trim());
      //console.log(profilefileds.skills);
      // res.send(profilefileds.skills);
      console.log(2);
      profilefileds.social = {};
      if (youtube) profilefileds.social.youtube = youtube;
      if (facebook) profilefileds.social.facebook = facebook;
      if (twitter) profilefileds.social.location = twitter;
      if (instagram) profilefileds.social.instagram = instagram;
      if (linkedin) profilefileds.social.linkedin = linkedin;
      //education
      profilefileds.education = {};

      if (levelofStudy) profilefileds.education.levelofStudy = levelofStudy;
      if (institution) profilefileds.education.institution = institution;
      if (fieldofstudy) profilefileds.education.fieldofstudy = fieldofstudy;
      if (yearofStudy) profilefileds.education.yearofStudy = yearofStudy;
      if (course) profilefileds.education.course = course;
      //if (req.education.from) profilefileds.education.from = req.education.from;
      //if (req.education.to) profilefileds.education.to = req.education.to;
      //if (req.education.current)  profilefileds.education.current = req.education.current;
      //check if profile exists and update if true
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefileds },
          { new: true }
        );
        return res.json(profile);
      }
      //otherwise create a new user profile
      profile = new Profile(profilefileds);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
