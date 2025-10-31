export const tournamentTypeDefs = `#graphql
  type Tournament {
    id: ID!
    name: String!
    description: String!
    category: String!
    location: String!
    date: String!
    endDate: String
    registrationDeadline: String
    registrationLink: String
    disciplines: [String!]
    ageCategories: [String!]
    status: String!
    imageUrl: String
    organizer: String
    contactInfo: ContactInfo
    isPublished: Boolean!
    results: [TournamentResult!]
    createdAt: String!
    updatedAt: String!
  }

  type ContactInfo {
    email: String
    phone: String
  }

  input ContactInfoInput {
    email: String
    phone: String
  }

  input CreateTournamentInput {
    name: String!
    description: String!
    category: String
    location: String!
    date: String!
    endDate: String
    registrationDeadline: String
    registrationLink: String
    disciplines: [String!]
    ageCategories: [String!]
    status: String
    imageUrl: String
    organizer: String
    contactInfo: ContactInfoInput
    isPublished: Boolean
  }

  input UpdateTournamentInput {
    name: String
    description: String
    category: String
    location: String
    date: String
    endDate: String
    registrationDeadline: String
    registrationLink: String
    disciplines: [String!]
    ageCategories: [String!]
    status: String
    imageUrl: String
    organizer: String
    contactInfo: ContactInfoInput
    isPublished: Boolean
  }

  type Query {
    tournaments(limit: Int, offset: Int, status: String, category: String): [Tournament!]!
    tournament(id: ID!): Tournament
    upcomingTournaments: [Tournament!]!
  }

  type Mutation {
    createTournament(input: CreateTournamentInput!): Tournament!
    updateTournament(id: ID!, input: UpdateTournamentInput!): Tournament!
    deleteTournament(id: ID!): Boolean!
  }
`;
