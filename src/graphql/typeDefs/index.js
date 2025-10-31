import { userTypeDefs } from './user.js';
import { newsTypeDefs } from './news.js';
import { tournamentTypeDefs } from './tournament.js';
import { tournamentResultTypeDefs } from './tournamentResult.js';
import { teacherTypeDefs } from './teacher.js';
import { contactTypeDefs } from './contact.js';

export const typeDefs = `#graphql
  ${userTypeDefs}
  ${newsTypeDefs}
  ${tournamentTypeDefs}
  ${tournamentResultTypeDefs}
  ${teacherTypeDefs}
  ${contactTypeDefs}
`;
