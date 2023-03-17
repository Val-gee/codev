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
        newUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user }
        },
        addProject: async (parent, { projectInput }, context) => {
            // console.log("Project Data: ", projectInput)
            console.log(context.user)
            if (context.user) {
                const project = await Project.create({...projectInput});
                console.log(project)
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { projects: project }},
                    {new: true}
                )
            } else {
                throw new AuthenticationError('You are not signed in!')
            }


        }
    }
};

module.exports = resolvers;