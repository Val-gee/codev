const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //works
        user: async (parent, { _id }) => {
            const user = await User.findById(_id);
            return user;
        },
        //works
        allUsers: async () => {
            return User.find();
        },
        project: async (parent, { _id }) => {
            const project = await Project.findById(_id);
            return project
        },
        allProjects: async () => {
            return Project.find();
        },       
    },
    Mutation: {
        login: async (parent, { username, password }) => {
            console.log('LOGGING IN!');

            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect Credentials!');
            }

            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError("Incorrect Credentials!");
            }

            const token = signToken(user);
            return { token, user };
        },
        newUser: async (parent, { UserInput }) => {
            const user = await User.create({ UserInput });
            const token = signToken(user);
            return { token, user }
        },
        addProject: async (parent, { projectInput }) => {
            const addProject = await Project.create({ projectInput })
        }
    }
};

module.exports = resolvers;