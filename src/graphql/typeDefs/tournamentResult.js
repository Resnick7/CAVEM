export const tournamentResultTypeDefs = `#graphql
  type TournamentResult {
    id: ID!
    tournament: Tournament!
    title: String!
    description: String
    pdfUrl: String!
    pdfFileName: String!
    fileSize: Int
    uploadedBy: User!
    resultType: String!
    discipline: String
    category: String
    isPublished: Boolean!
    publishedAt: String
    downloads: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTournamentResultInput {
    tournamentId: ID!
    title: String!
    description: String
    resultType: String
    discipline: String
    category: String
    isPublished: Boolean
  }

  input UpdateTournamentResultInput {
    title: String
    description: String
    resultType: String
    discipline: String
    category: String
    isPublished: Boolean
  }

  type Query {
    tournamentResults(tournamentId: ID, limit: Int, offset: Int): [TournamentResult!]!
    tournamentResult(id: ID!): TournamentResult
  }

  type Mutation {
    createTournamentResult(input: CreateTournamentResultInput!, pdfUrl: String!, pdfFileName: String!, fileSize: Int): TournamentResult!
    updateTournamentResult(id: ID!, input: UpdateTournamentResultInput!): TournamentResult!
    deleteTournamentResult(id: ID!): Boolean!
    incrementResultDownloads(id: ID!): TournamentResult!
  }
`;
