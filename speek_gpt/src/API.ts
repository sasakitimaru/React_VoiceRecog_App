/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
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
  usedElevenTokens?: ModelIntInput | null,
  usedTokens?: ModelIntInput | null,
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
  usedElevenTokens?: number | null,
  usedTokens?: number | null,
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
  usedElevenTokens?: number | null,
  usedTokens?: number | null,
  conversations?: Array< ConversationEntryInput | null > | null,
};

export type DeleteUserInput = {
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
  usedElevenTokens?: ModelIntInput | null,
  usedTokens?: ModelIntInput | null,
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

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  usedElevenTokens?: ModelSubscriptionIntInput | null,
  usedTokens?: ModelSubscriptionIntInput | null,
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
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
      usedElevenTokens?: number | null,
      usedTokens?: number | null,
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

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id?: string | null,
    name?: string | null,
    email?: string | null,
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
    usedElevenTokens?: number | null,
    usedTokens?: number | null,
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
