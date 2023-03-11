const { Schema } = require("mongoose");

const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "https://picsum.photos/200",
  },
  bio: {
    type: String,
    default: "Biography",
  },
  location: {
    type: String,
    default: "",
  },
  contact: {
    github: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "Portfolio URL",
    },
  },
});

const Profile = model("Profile", userProfileSchema);

module.exports = Profile;