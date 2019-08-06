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
  exprience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
  Projects: [
    {
      title: {
        type: String,
        required: true
      },
      domain: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
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
      required: true
    },
    to: {
      type: Date,
      required: false
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
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
