import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      firstname
      lastname
      username
      profile {
        profilePicture
        bio
        location
        contact {
          github
          linkedIn
          website
        }
      }
      projects {
        _id
        projectName
        projectDescription
        projectRequirements
        tags {
          name
        }
        owner {
          _id
          firstname
          lastname
          username
          email
        }
        collaborators {
          _id
          firstname
          lastname
          username
          email
        }
      }
    }
  }
}
`
// Response for login mutation:
// {
//   "data": {
//     "login": {
//       "token": "user's token",
//       "user": {
//         "_id": "6425aa446b1be9e94a888252",
//         "firstname": "String",
//         "lastname": "String",
//         "username": "String",
//         "profile": {
//           "profilePicture": "https://picsum.photos/200",
//           "bio": "About me",
//           "location": "Location",
//           "contact": {
//             "github": "GitHub link",
//             "linkedIn": "LinkedIn Link",
//             "website": "Portfolio Link"
//           }
//         },
//         "projects": [{array of project objects with id, projectName, projectDescription, projectRequirements, tage names, owner(_id, first and last name, username, email) and collaborators(_id, first and last name, username, email)}]
//       }
//     }
//   }
// }

export const MUTATION_NEW_USER = gql`
mutation NewUser($firstname: String!, $lastname: String!, $username: String!, $password: String!, $email: String!) {
  newUser(firstname: $firstname, lastname: $lastname, username: $username, password: $password, email: $email) {
    token
    user {
      _id
      firstname
      lastname
      username
      profile {
        profilePicture
        bio
        location
        contact {
          github
          linkedIn
          website
        }
      }
      projects {
        _id
        projectName
        tags {
          name
        }
        owner {
          _id
          firstname
          lastname
          username
          email
        }
        collaborators {
          _id
          firstname
          lastname
          username
          email
        }
      }
      friends {
        _id
        firstname
        lastname
        username
        email
      }
      email
    }
  }
}
`
// Response for newUser mutation:
// {
//   "data": {
//     "newUser": {
//       "token": "user's token",
//       "user": {
//         "_id": "users _id",
//         "firstname": "String",
//         "lastname": " String",
//         "username": "user unique password",
//         "profile": null,
//         "projects": [{array of project objects with id, projectName, tage names, owner(_id, first and last name, username, email) and collaborators(_id, first and last name, username, email)}],
//         "friends": [{array of friend objects with id, first and last name, username, email}],
//         "email": "New User's email"
//       }
//     }
//   }
// }

export const MUTATION_ADD_PROJECT = gql`
mutation AddProject($projectInput: ProjectInput!) {
  addProject(projectInput: $projectInput) {
    _id
    firstname
    lastname
    username
    projects {
      _id
      projectName
      projectDescription
      projectRequirements
      tags {
        name
      }
      owner {
        _id
      }
      collaborators {
        _id
      }
    }
    email
  }
}
`
//  Response for addProject mutation:
// {
//   "data": {
//     "addProject": {
//       "_id": "6425aa446b1be9e94a888252",
//       "firstname": "Valentina",
//       "lastname": "Guevara",
//       "username": "val-gee",
//       "projects": [
//         {
//           "_id": "642632f3c9a9a1ebd9fd9b5b",
//           "projectName": "Project Title here.",
//           "projectDescription": "Project Decription here.",
//           "projectRequirements": "Project requirements here.",
//           "tags": [
//             {
//               "name": "#projectHashtags"
//             }
//           ],
//           "owner": {
//             "_id": "6425aa446b1be9e94a888252"
//           },
//           "collaborators": [
//             {
//               "_id": "64262fd6738142085936517d"
//             }
//           ]
//         },
//       ],
//       "email": "vguevara0806@gmail.com"
//     }
//   }
// }

export const MUTATION_REMOVE_PROJECT = gql `
mutation RemoveProject($removeProjectId: ID!) {
  removeProject(id: $removeProjectId) {
    _id
    firstname
    lastname
    username
    profile {
      profilePicture
      bio
      location
      contact {
        github
        linkedIn
        website
      }
    }
    projects {
      _id
    }
    friends {
      _id
    }
    email
  }
}
`
// Response for removeProject mutation:
// {
//   "data": {
//     "removeProject": {
//       "_id": "user _id",
//       "firstname": "String",
//       "lastname": "String",
//       "username": "String",
//       "profile": {
//         "profilePicture": "https://picsum.photos/200",
//         "bio": "About me",
//         "location": "Location",
//         "contact": {
//           "github": "GitHub link",
//           "linkedIn": "LinkedIn Link",
//           "website": "Portfolio Link"
//         }
//       },
//       "projects": [**excluding the removed projects**
//         {
//           "_id": "Project _id"
//         }
//       ],
//       "friends": [{array of friend objects with _id }],
//       "email": "user's email"
//     }
//   }
// }

export const MUTATION_CREATEORUPDATE_PROFILE = gql`
mutation CreateOrUpdateUserProfile($profileInput: UserProfileInput!) {
  createOrUpdateUserProfile(profileInput: $profileInput) {
    _id
    firstname
    lastname
    username
    profile {
      profilePicture
      bio
      location
      contact {
        github
        linkedIn
        website
      }
    }
    projects {
      _id
      projectName
      tags {
        name
      }
    }
    friends {
      _id
    }
    email
  }
}
`;
// Response for createOrUpdateUserProfile mutation:
// {
//   "data": {
//     "createOrUpdateUserProfile": {
//       "_id": "User's _id",
//       "firstname": "String",
//       "lastname": "String",
//       "username": "String",
//       "profile": {
//         "profilePicture": "String",
//         "bio": "About me",
//         "location": "Location",
//         "contact": {
//           "github": "GitHub link",
//           "linkedIn": "LinkedIn Link",
//           "website": "Portfolio Link"
//         }
//       },
//       "projects": [{array of project objects with project _id, projectName, and tag names}],
//       "friends": [{array of friend objects with friends _id }],
//       "email": "user's email"
//     }
//   }
// }
