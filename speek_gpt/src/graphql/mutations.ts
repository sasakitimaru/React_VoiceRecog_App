/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createInquiryForm = /* GraphQL */ `
  mutation CreateInquiryForm(
    $input: CreateInquiryFormInput!
    $condition: ModelInquiryFormConditionInput
  ) {
    createInquiryForm(input: $input, condition: $condition) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateInquiryForm = /* GraphQL */ `
  mutation UpdateInquiryForm(
    $input: UpdateInquiryFormInput!
    $condition: ModelInquiryFormConditionInput
  ) {
    updateInquiryForm(input: $input, condition: $condition) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteInquiryForm = /* GraphQL */ `
  mutation DeleteInquiryForm(
    $input: DeleteInquiryFormInput!
    $condition: ModelInquiryFormConditionInput
  ) {
    deleteInquiryForm(input: $input, condition: $condition) {
      email
      item
      message
      id
      createdAt
      updatedAt
    }
  }
`;
