export const contactTypeDefs = `#graphql
  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String
    subject: String!
    message: String!
    status: String!
    category: String!
    responseNote: String
    respondedBy: User
    respondedAt: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateContactInput {
    name: String!
    email: String!
    phone: String
    subject: String!
    message: String!
    category: String
  }

  input UpdateContactInput {
    status: String
    responseNote: String
  }

  type Query {
    contacts(status: String, category: String, limit: Int, offset: Int): [Contact!]!
    contact(id: ID!): Contact
    pendingContacts: [Contact!]!
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact!
    updateContact(id: ID!, input: UpdateContactInput!): Contact!
    deleteContact(id: ID!): Boolean!
    markContactAsRead(id: ID!): Contact!
    markContactAsResponded(id: ID!, responseNote: String!): Contact!
  }
`;
