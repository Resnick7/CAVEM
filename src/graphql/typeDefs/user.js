export const userTypeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    isActive: Boolean!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, username: String, email: String, isActive: Boolean): User!
    deleteUser(id: ID!): Boolean!
  }
`;
