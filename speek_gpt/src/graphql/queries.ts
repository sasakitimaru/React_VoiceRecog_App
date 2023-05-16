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
      plan
      planRegisteredDate
      usedElevenTokens
      usedTokens
      validDays
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
        plan
        planRegisteredDate
        usedElevenTokens
        usedTokens
        validDays
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
export const getInquiryForm = /* GraphQL */ `
  query GetInquiryForm($id: ID!) {
    getInquiryForm(id: $id) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
export const listInquiryForms = /* GraphQL */ `
  query ListInquiryForms(
    $filter: ModelInquiryFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInquiryForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        email
        item
        message
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
