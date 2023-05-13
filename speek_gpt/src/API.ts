/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
  plan?: string | null,
  planRegisteredDate?: string | null,
  validDays?: number | null,
  usedElevenTokens?: number | null,
  usedTokens?: number | null,
  conversations?: Array< ConversationEntryInput | null > | null,
};

export type ConversationEntryInput = {
  sectionID?: string | null,
  topic?: string | null,
  timestamp?: string | null,
  conversation?: Array< ConversationInput | null > | null,
};

export type ConversationInput = {
  messageID?: string | null,
  isUser?: boolean | null,
  message?: string | null,
  timestamp?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  plan?: ModelStringInput | null,
  planRegisteredDate?: ModelStringInput | null,
  usedElevenTokens?: ModelIntInput | null,
  usedTokens?: ModelIntInput | null,
  validDays?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id?: string | null,
  name?: string | null,
  email?: string | null,
  plan?: string | null,
  planRegisteredDate?: string | null,
  usedElevenTokens?: number | null,
  usedTokens?: number | null,
  validDays?: number | null,
  conversations?:  Array<ConversationEntry | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ConversationEntry = {
  __typename: "ConversationEntry",
  sectionID?: string | null,
  topic?: string | null,
  timestamp?: string | null,
  conversation?:  Array<Conversation | null > | null,
};

export type Conversation = {
  __typename: "Conversation",
  messageID?: string | null,
  isUser?: boolean | null,
  message?: string | null,
  timestamp?: string | null,
};

export type UpdateUserInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
  plan?: string | null,
  planRegisteredDate?: string | null,
  validDays?: number | null,
  usedElevenTokens?: number | null,
  usedTokens?: number | null,
  conversations?: Array< ConversationEntryInput | null > | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateInquiryFormInput = {
  email?: string | null,
  item?: string | null,
  message?: string | null,
};

export type ModelInquiryFormConditionInput = {
  email?: ModelStringInput | null,
  item?: ModelStringInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelInquiryFormConditionInput | null > | null,
  or?: Array< ModelInquiryFormConditionInput | null > | null,
  not?: ModelInquiryFormConditionInput | null,
};

export type InquiryForm = {
  __typename: "InquiryForm",
  email?: string | null,
  item?: string | null,
  message?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateInquiryFormInput = {
  email?: string | null,
  item?: string | null,
  message?: string | null,
  id: string,
};

export type DeleteInquiryFormInput = {
  id: string,
};

export type MessageForAIInput = {
  role?: string | null,
  content?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  plan?: ModelStringInput | null,
  planRegisteredDate?: ModelStringInput | null,
  usedElevenTokens?: ModelIntInput | null,
  usedTokens?: ModelIntInput | null,
  validDays?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelInquiryFormFilterInput = {
  email?: ModelStringInput | null,
  item?: ModelStringInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelInquiryFormFilterInput | null > | null,
  or?: Array< ModelInquiryFormFilterInput | null > | null,
  not?: ModelInquiryFormFilterInput | null,
};

export type ModelInquiryFormConnection = {
  __typename: "ModelInquiryFormConnection",
  items:  Array<InquiryForm | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  plan?: ModelSubscriptionStringInput | null,
  planRegisteredDate?: ModelSubscriptionStringInput | null,
  usedElevenTokens?: ModelSubscriptionIntInput | null,
  usedTokens?: ModelSubscriptionIntInput | null,
  validDays?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionInquiryFormFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  item?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInquiryFormFilterInput | null > | null,
  or?: Array< ModelSubscriptionInquiryFormFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateInquiryFormMutationVariables = {
  input: CreateInquiryFormInput,
  condition?: ModelInquiryFormConditionInput | null,
};

export type CreateInquiryFormMutation = {
  createInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInquiryFormMutationVariables = {
  input: UpdateInquiryFormInput,
  condition?: ModelInquiryFormConditionInput | null,
};

export type UpdateInquiryFormMutation = {
  updateInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInquiryFormMutationVariables = {
  input: DeleteInquiryFormInput,
  condition?: ModelInquiryFormConditionInput | null,
};

export type DeleteInquiryFormMutation = {
  deleteInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GenerateResponseQueryVariables = {
  messageForAI?: Array< MessageForAIInput | null > | null,
};

export type GenerateResponseQuery = {
  generateResponse?: string | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id?: string | null,
      name?: string | null,
      email?: string | null,
      plan?: string | null,
      planRegisteredDate?: string | null,
      usedElevenTokens?: number | null,
      usedTokens?: number | null,
      validDays?: number | null,
      conversations?:  Array< {
        __typename: "ConversationEntry",
        sectionID?: string | null,
        topic?: string | null,
        timestamp?: string | null,
      } | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetInquiryFormQueryVariables = {
  id: string,
};

export type GetInquiryFormQuery = {
  getInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInquiryFormsQueryVariables = {
  filter?: ModelInquiryFormFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInquiryFormsQuery = {
  listInquiryForms?:  {
    __typename: "ModelInquiryFormConnection",
    items:  Array< {
      __typename: "InquiryForm",
      email?: string | null,
      item?: string | null,
      message?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    plan?: string | null,
    planRegisteredDate?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
    validDays?: number | null,
    conversations?:  Array< {
      __typename: "ConversationEntry",
      sectionID?: string | null,
      topic?: string | null,
      timestamp?: string | null,
      conversation?:  Array< {
        __typename: "Conversation",
        messageID?: string | null,
        isUser?: boolean | null,
        message?: string | null,
        timestamp?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateInquiryFormSubscriptionVariables = {
  filter?: ModelSubscriptionInquiryFormFilterInput | null,
};

export type OnCreateInquiryFormSubscription = {
  onCreateInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInquiryFormSubscriptionVariables = {
  filter?: ModelSubscriptionInquiryFormFilterInput | null,
};

export type OnUpdateInquiryFormSubscription = {
  onUpdateInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInquiryFormSubscriptionVariables = {
  filter?: ModelSubscriptionInquiryFormFilterInput | null,
};

export type OnDeleteInquiryFormSubscription = {
  onDeleteInquiryForm?:  {
    __typename: "InquiryForm",
    email?: string | null,
    item?: string | null,
    message?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
