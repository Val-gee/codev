const { Schema, model } = require("mongoose");
const tagSchema = require("./Tag");

const projectSchema = new Schema(
  {
    date_created: {
      type: Date,
      default: Date.now,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      maxlength: [1500, "Description is longer than 1500 characters"],
    },
    projectRequirements: {
      type: String,
      maxlength: [1500, "Requirement is longer than 1500 characters"],
    },
    tags: [ tagSchema ],
    interested: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // getter can be used to format the date
      getters: true,
    },
    id: false,
  }
);

projectSchema.virtual("interestedCount").get(function () {
  return this.interested.length;
});

const Project = model("Project", projectSchema);

module.exports = Project;
