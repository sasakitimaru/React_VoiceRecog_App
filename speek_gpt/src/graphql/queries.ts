/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateResponse = /* GraphQL */ `
  query GenerateResponse($messageForAI: [MessageForAIInput]) {
    generateResponse(messageForAI: $messageForAI)
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      usedElevenTokens
      usedTokens
      conversations {
        sectionID
        topic
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
        usedElevenTokens
        usedTokens
        conversations {
          sectionID
          topic
          timestamp
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
