/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateInquiryForm = /* GraphQL */ `
  subscription OnCreateInquiryForm(
    $filter: ModelSubscriptionInquiryFormFilterInput
  ) {
    onCreateInquiryForm(filter: $filter) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInquiryForm = /* GraphQL */ `
  subscription OnUpdateInquiryForm(
    $filter: ModelSubscriptionInquiryFormFilterInput
  ) {
    onUpdateInquiryForm(filter: $filter) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInquiryForm = /* GraphQL */ `
  subscription OnDeleteInquiryForm(
    $filter: ModelSubscriptionInquiryFormFilterInput
  ) {
    onDeleteInquiryForm(filter: $filter) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
