const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profileschema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  skills: {
    type: [String],
    required: true
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },

  Projects: {
    title: {
      type: String,
      required: false
    },
    domain: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  },
  education: {
    institution: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    levelofStudy: {
      type: String,
      required: true
    },
    yearofStudy: {
      type: String,
      required: true
    },
    fieldofstudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: false
    },
    to: {
      type: Date,
      required: false
    },
    current: {
      type: Boolean,
      default: false
    }
  },
  social: {
    githubusername: {
      type: String
    },
    youtube: {
      type: String,
      required: true
    },
    facebook: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    },
    instagram: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model("Profile", Profileschema);
module.exports = Profile;
