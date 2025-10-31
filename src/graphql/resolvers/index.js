import { userResolvers } from './userResolvers.js';
import { newsResolvers } from './newsResolvers.js';
import { tournamentResolvers } from './tournamentResolvers.js';
import { tournamentResultResolvers } from './tournamentResultResolvers.js';
import { teacherResolvers } from './teacherResolvers.js';
import { contactResolvers } from './contactResolvers.js';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...newsResolvers.Query,
    ...tournamentResolvers.Query,
    ...tournamentResultResolvers.Query,
    ...teacherResolvers.Query,
    ...contactResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...newsResolvers.Mutation,
    ...tournamentResolvers.Mutation,
    ...tournamentResultResolvers.Mutation,
    ...teacherResolvers.Mutation,
    ...contactResolvers.Mutation
  },
  User: userResolvers.User || {},
  News: newsResolvers.News,
  Tournament: tournamentResolvers.Tournament,
  TournamentResult: tournamentResultResolvers.TournamentResult,
  Teacher: teacherResolvers.Teacher,
  Contact: contactResolvers.Contact
};
