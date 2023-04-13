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
    friendRequests: [User]
    email: String!
  }
  type Project {
    _id: ID!
    projectName: String!
    projectDescription: String!
    projectRequirements: String!
    tags: [Tag]
    owner: User
    collaborators: [User]
  }
  input ProjectInput {
    projectName: String!
    projectDescription: String!
    projectRequirements: String!
    tags: [TagInput]
    interested: [String]
    collaborators: [String]
  }
  type UserProfile {
    user: ID!
    profilePicture: String
    bio: String
    location: String
    contact: Contact
  }
  input UserProfileInput {
    user: ID!
    profilePicture: String
    bio: String
    location: String
    contact: ContactInput
  }
  type Contact {
    github: String
    linkedIn: String
    website: String
  }
  input ContactInput {
    github: String
    linkedIn: String
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
    userByName(username: String!): User
    allUsers: [User]
    project(_id: ID): Project
    allProjects: [Project]
    projectByTag(name: String!): [Project]
    projectByName(projectName: String!): [Project]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    newUser(
      firstname: String!
      lastname: String!
      username: String!
      password: String!
      email: String!
    ): Auth
    addProject(projectInput: ProjectInput!): User
    removeProject(id: ID!): User
    createOrUpdateUserProfile(profileInput: UserProfileInput!): User
    addFriend(id: ID!): User
    removeFriend(id: ID!): User
    sendFriendRequest(toUserId: ID!): Boolean
  }
`;

module.exports = typeDefs;