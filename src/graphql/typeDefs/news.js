export const newsTypeDefs = `#graphql
  type News {
    id: ID!
    title: String!
    content: String!
    excerpt: String
    imageUrl: String
    author: User!
    category: String!
    tags: [String!]
    isPublished: Boolean!
    publishedAt: String
    views: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CreateNewsInput {
    title: String!
    content: String!
    excerpt: String
    imageUrl: String
    category: String
    tags: [String!]
    isPublished: Boolean
  }

  input UpdateNewsInput {
    title: String
    content: String
    excerpt: String
    imageUrl: String
    category: String
    tags: [String!]
    isPublished: Boolean
  }

  type Query {
    news(limit: Int, offset: Int, category: String, isPublished: Boolean): [News!]!
    newsItem(id: ID!): News
    searchNews(query: String!): [News!]!
  }

  type Mutation {
    createNews(input: CreateNewsInput!): News!
    updateNews(id: ID!, input: UpdateNewsInput!): News!
    deleteNews(id: ID!): Boolean!
    incrementNewsViews(id: ID!): News!
  }
`;
