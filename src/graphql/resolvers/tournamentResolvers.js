import Tournament from '../../models/Tournament.js';
import TournamentResult from '../../models/TournamentResult.js';
import { requireAdmin } from '../../middleware/auth.js';

export const tournamentResolvers = {
  Query: {
    tournaments: async (_, { limit = 10, offset = 0, status, category }) => {
      const filter = {};
      
      if (status) filter.status = status;
      if (category) filter.category = category;

      return await Tournament.find(filter)
        .sort({ date: -1 })
        .limit(limit)
        .skip(offset);
    },

    tournament: async (_, { id }) => {
      const tournament = await Tournament.findById(id);
      
      if (!tournament) {
        throw new Error('Torneo no encontrado');
      }
      
      return tournament;
    },

    upcomingTournaments: async () => {
      const today = new Date();
      return await Tournament.find({
        date: { $gte: today },
        status: { $in: ['próximo', 'en_curso'] },
        isPublished: true
      })
        .sort({ date: 1 })
        .limit(10);
    }
  },

  Mutation: {
    createTournament: async (_, { input }, context) => {
      requireAdmin(context);

      const tournament = await Tournament.create(input);
      return tournament;
    },

    updateTournament: async (_, { id, input }, context) => {
      requireAdmin(context);

      const tournament = await Tournament.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      );

      if (!tournament) {
        throw new Error('Torneo no encontrado');
      }

      return tournament;
    },

    deleteTournament: async (_, { id }, context) => {
      requireAdmin(context);

      const tournament = await Tournament.findByIdAndDelete(id);

      if (!tournament) {
        throw new Error('Torneo no encontrado');
      }

      // También eliminar los resultados asociados
      await TournamentResult.deleteMany({ tournament: id });

      return true;
    }
  },

  Tournament: {
    id: (parent) => parent._id.toString(),
    results: async (parent) => {
      return await TournamentResult.find({ 
        tournament: parent._id,
        isPublished: true 
      })
        .sort({ publishedAt: -1 })
        .populate('uploadedBy', 'username email');
    }
  }
};
