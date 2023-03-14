const { gql } = require("apollo-server-express");

const typeDefs = gql`
  #   scalar Date

  type User {
    _id: ID!
    oauthID: Number
    firstname: String!
    lastname: String!
    username: String!
    projects: [Project]
    friends: [User]
    email: String!
  }
  type Project {
    projectName: String!
    projectDescription: String!
    projectRequirements: String!
    # tags: [tagSchema]
    owner: User!
    collaborators: [User]
  }

  input UserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
  }
  input ProjectInput {
    projectName: String!
    projectDescription: String!
    projectRequirements: String!
    interested: [String]
    owner: String!
    collaborators: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    project(_id: ID): Project
  }

  type Mutation {
    # need to add ': Auth' to mutations that require users to be logged in (login, new user, add project)
    login(username: String!, password: String!): Auth
    newUser(userInput: UserInput!): Auth
    addProject(projectInput: ProjectInput!): User
    # requestCollab(project: ProjectInput!): User
  }
`;

module.exports = typeDefs;