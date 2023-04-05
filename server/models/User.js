const { Schema, model } = require("mongoose");
const userProfileSchema = require('./Profile')
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profile: userProfileSchema,
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])(?=.*[^\s]).{8,}$/,
        "Password must contain at least 8 characters, an uppercase, a lowercase, and a special character like '!@#$%^&*'",
      ],
    },
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

// hashes the user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// method to validate password for login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("projectCount").get(function() {
  return this.projects.length;
});

userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;