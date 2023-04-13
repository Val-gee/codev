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
        .populate("profile")
        .populate("friends")
        .populate("friendRequests");
      return user;
    },
    //works
    userByName: async (parent, { username }) => {
      console.log(username);
      const user = await User.findOne( {username} );
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
    //works
    projectByName: async(parent, { projectName }) => {
      console.log(projectName);
      const projects = await Project.find({ "projectName": projectName })
      .populate('tags')
      .populate("owner")
      .populate("collaborators");

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
    //works
    sendFriendRequest: async (parent, { toUserId }, context) => {
      console.log(context.user);
      try {
        if (!context.user) {
          throw new AuthenticationError("You must be logged in!")
        }

        const currentUserId = context.user._id;

        const existingRequest = await User.findOne({
          _id: toUserId,
          friendRequests: currentUserId
        });
        if (existingRequest) {
          throw new Error("You have already sent a request to this person!");
        }

        const existingFriend = await User.findOne({
          _id: toUserId,
          friends: currentUserId
        });
        if (existingFriend) {
          throw new Error("You are already friend's with this person.")
        }

        const request = await User.updateOne(
          { _id: toUserId },
          { $addToSet: { friendRequests: currentUserId } }
        )
        if (request) {
          return true;
        } else {
          return false
        }
      } catch (err) {
        console.log(err);
        throw new Error("Failed to send friend request!")
      }
    },
    //works
    addFriend: async (parent, { id }, context) => {
      console.log(context.user);
      try {
        if (context.user) {
          const addFriend = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: id }, $pull: { friendRequests: id } },
            { new: true }
          ).populate("friends");
          const addingFriend = await User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { friends: context.user._id } },
            { new: true }
          );
          return addFriend;
        } else {
          throw new AuthenticationError("You must be logged in!")
        }
      } catch (err) {
        console.log(err);
        throw new Error("Failed to add friend!")
      }
    },
    //works
    removeFriend: async (parent, { id }, context) => {
      console.log(context.user);
      try {
        if (context.user) {
          const removeFriend = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { friends: id } },
            { new: true }
          );

          const removingFriend = await User.findOneAndUpdate(
            { _id: id },
            { $pull: { friends: context.user._id } },
            { new: true }
          );

          return removeFriend;
        } else {
          throw new AuthenticationError("You must be logged in!")
        }
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Failed to remove friend.")
      }
    }
  },
};

module.exports = resolvers;
