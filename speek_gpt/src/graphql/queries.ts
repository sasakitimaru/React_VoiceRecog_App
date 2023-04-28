/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      conversations {
        sectionID
        timestamp
        conversation {
          messageID
          isUser
          message
          timestamp
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const getUserSectionID = /* GraphQL */ `
query GetUser($id: ID!) {
  getUser(id: $id) {
    conversations {
      sectionID
    }
  }
}
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        conversations {
          sectionID
          timestamp
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
