const { AuthenticationError } = require("apollo-server-express");
// const { ConnectionCheckOutFailedEvent } = require("mongodb");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //works
    user: async (parent, { _id }) => {
      const user = await User.findById(_id)
        .populate("projects")
        .populate("profile");
      return user;
    },
    //works
    allUsers: async () => {
      return User.find().populate("projects");
    },
    project: async (parent, { _id }) => {
      const project = await Project.findById(_id).populate("owner");
      return project;
    },
    allProjects: async () => {
      return Project.find().populate("owner").populate("tags");
    },
    projectByTag: async (parent, { name }) => {
      console.log(name);
      const projects = await Project.find({ "tags.name": name })
        .populate("owner")
        .populate("collaborators");

      console.log(projects);
      return projects;
    },
    //do we need a userProfile query? can we just get the profile from the user query above?
    // userProfile: async (parent, { user }, context) => {
    //     console.log(user)
    //     console.log(context.user)
    //       try {
    //         if (context.user) {
    //           const userProfile = await User.findAll({user: user})
    //             .populate("projects")
    //             .populate("profile");
    //           return userProfile;
    //         } else {
    //           throw new AuthenticationError("You must be logged in!");
    //         }
    //       } catch (err) {
    //         console.log(err);
    //         throw new Error("No user with that ID");
    //       }
    // }
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      console.log("LOGGING IN!");

      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Cannot find user with that username!");
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    newUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addProject: async (parent, { projectInput }, context) => {
      // console.log("Project Data: ", projectInput)
      console.log(context.user);
      try {
        if (context.user) {
          const project = await Project.create({
            ...projectInput,
            owner: context.user._id,
          });
          console.log(project);
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { projects: project } },
            { new: true }
          ).populate('projects');
          return user
        } else {
          throw new AuthenticationError("You are not signed in!");
        }
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create project!");
      }
    },
    createOrUpdateUserProfile: async (parent, { profileInput }, context) => {
      console.log(context.user);
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { profile: { ...profileInput } } },
            { new: true }
          ).populate('projects');
          return user
        } else {
          throw new AuthenticationError("Could not update profile at this time.");
        }
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("You must be logged in!");
      }
    },
  },
};

module.exports = resolvers;
