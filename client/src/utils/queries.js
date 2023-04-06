import { gql } from '@apollo/client';

export const QUERY_USERBYID = gql`
query User($id: ID!) {
  user(_id: $id) {
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
    }
    friends {
      _id
      username
    }
    friendRequests {
      _id
      username
    }
    email
  }
}
`
// Response for UserById query:
// {
//     "data": {
//       "user": {
//         "_id": "user _id",
//         "firstname": "String",
//         "lastname": "String",
//         "username": "String",
//         "profile": [*ProfilePic, bio, location, contact(github linkedin and website link)}],
//         "projects": [{_id, projectname}],
//         "friends": [ {_id and username}],
//         "friendRequests": [{ _id and username }],
//         "email": "user email"
//       }
//     }
//   }

export const QUERY_ALLUSERS = gql`
  query allUsers {
    allUsers {
      _id
      username
      firstname
      lastname
      projects {
        projectName
        _id
      }
    }
  }
`;

// Response for allUsers query:
// {
//   "data": {
//     "allUsers": [
//       {
//         "_id": "642dc577a1ed87faaf26d3e8",
//         "username": "mtran",
//         "firstname": "Michelle",
//         "lastname": "Tran",
//         "projects": [
//           {
//             "projectName": "project name",
//             "_id": "642dc664a1ed87faaf26d3ed"
//           }
//         ]
//       }
//     ]
//   }
// }

export const QUERY_PROJECTBYID = gql`
  query projectbyid($id: ID) {
    project(_id: $id) {
      _id
      tags {
        name
      }
      projectRequirements
      projectName
      projectDescription
      owner {
        _id
        username
        firstname
        lastname
      }
      collaborators {
        username
        _id
        firstname
        lastname
      }
    }
  }
`;

// Response for ProjectByID query
// {
//   "data": {
//     "project": {
//       "_id": "642dc664a1ed87faaf26d3ed",
//       "tags": [
//         {
//           "name": "tech"
//         }
//       ],
//       "projectRequirements": "project req",
//       "projectName": "project name",
//       "projectDescription": "desc",
//       "owner": {
//         "_id": "642dc577a1ed87faaf26d3e8",
//         "username": "mtran",
//         "firstname": "Michelle",
//         "lastname": "Tran"
//       },
//       "collaborators": []
//     }
//   }
// }

export const QUERY_ALLPROJECTS = gql`
  query AllProjects {
    allProjects {
      _id
      collaborators {
        _id
        username
        firstname
        lastname
      }
      owner {
        _id
        username
      }
      projectDescription
      projectName
      projectRequirements
      tags {
        name
      }
    }
  }
`;

//response for all projects query:
// {
//   "data": {
//     "allProjects": [
//       {
//         "_id": "642dc664a1ed87faaf26d3ed",
//         "collaborators": [],
//         "owner": {
//           "_id": "642dc577a1ed87faaf26d3e8",
//           "username": "mtran"
//         },
//         "projectDescription": "desc",
//         "projectName": "project name",
//         "projectRequirements": "project req",
//         "tags": [
//           {
//             "name": "tech"
//           }
//         ]
//       }
//     ]
//   }
// }

export const QUERY_PROJECTBYTAG = gql`
  query ProjectByTag($name: String!) {
    projectByTag(name: $name) {
      tags {
        name
      }
      _id
      projectName
      projectDescription
      projectRequirements
      owner {
        _id
        username
        firstname
        lastname
      }
      collaborators {
        _id
        username
        firstname
        lastname
      }
    }
  }
`;

//response for project by tags
// {
//   "data": {
//     "projectByTag": [
//       {
//         "tags": [
//           {
//             "name": "tech"
//           }
//         ],
//         "_id": "642dc664a1ed87faaf26d3ed",
//         "projectName": "project name",
//         "projectDescription": "desc",
//         "projectRequirements": "project req",
//         "owner": {
//           "_id": "642dc577a1ed87faaf26d3e8",
//           "username": "mtran",
//           "firstname": "Michelle",
//           "lastname": "Tran"
//         },
//         "collaborators": []
//       }
//     ]
//   }
// }