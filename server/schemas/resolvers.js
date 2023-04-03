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
    //works
    project: async (parent, { _id }) => {
      const project = await Project.findById(_id).populate("owner");
      return project;
    },
    //works
    allProjects: async () => {
      return Project.find().populate("owner").populate("tags");
    },
    //works
    projectByTag: async (parent, { name }) => {
      console.log(name);
      const projects = await Project.find({ "tags.name": name })
        .populate("owner")
        .populate("collaborators");

      console.log(projects);
      return projects;
    },
  },
  Mutation: {
    //works
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
    //works
    newUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    //works
    addProject: async (parent, { projectInput }, context) => {
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
          throw new AuthenticationError("You must be signed in!");
        }
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create project!");
      }
    },
    //works
    removeProject: async (parent, { id }, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pullAll: { projects: [id] } },
            { new: true }
          );

          const deleteProject = await Project.findByIdAndDelete(id);

          return user
        } else {
          throw new AuthenticationError("You must be signed in!")
        }
      } catch (err) {
        console.log(err);
        throw new Error("Failed to remove project!");
      }
    },
    //works
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
    addFriend: async (parent, { id }, context) => {
      console.log(context.user);
      try {
        if (context.user) {

          const addFriend = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: id} },
            { new: true }
          );
          const friend = await User. findById(id);

          return addFriend, friend;
        } else {
          throw new AuthenticationError("You must be logged in!")
        }
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Failed to add friend")
      }
    }
  },
};

module.exports = resolvers;
