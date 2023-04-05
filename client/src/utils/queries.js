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