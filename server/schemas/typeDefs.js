const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    username: String!
    profile: UserProfile
    projects: [Project]
    friends: [User]
    email: String!
    password: String!
  }
  input UserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
  }
  type Project {
    projectName: String!
    projectDescription: String!
    projectRequirements: String!
    tags: [Tag]
    owner: User!
    collaborators: [User]
  }
  input ProjectInput {
    projectName: String!
    projectDescription: String!
    projectRequirements: String!
    tags: [TagInput]
    interested: [String]
    owner: String!
    collaborators: [String]
  }
  type UserProfile {
    user: ID!,
    profilePicture: String,
    bio: String,
    location: String,
    contact: Contact
  }
  input UserProfileInput {
    user: ID!,
    profilePicture: String,
    bio: String,
    location: String,
    contact: ContactInput
  }
  type Contact {
    github: String,
    linkedIn: String,
    website: String
  }
  input ContactInput {
    github: String,
    linkedIn: String,
    website: String
  }
  type Tag {
  name: String
  }
  input TagInput {
    name: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(_id: ID!): User
    allUsers: [User]
    project(_id: ID): Project
    allProjects: [Project]
    userProfile(user: ID!): UserProfile
  }

  type Mutation {
    # need to add ': Auth' to mutations that require users to be logged in (login, new user, add project)
    login(username: String!, password: String!): Auth
    newUser(input: UserInput!): Auth
    addProject(projectInput: ProjectInput!): User
    # requestCollab(project: ProjectInput!): User
    createOrUpdateUserProfile(input: UserProfileInput!): UserProfile!
  }
`;

module.exports = typeDefs;