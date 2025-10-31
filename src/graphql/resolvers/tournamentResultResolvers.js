import TournamentResult from '../../models/TournamentResult.js';
import Tournament from '../../models/Tournament.js';
import { requireAdmin } from '../../middleware/auth.js';

export const tournamentResultResolvers = {
  Query: {
    tournamentResults: async (_, { tournamentId, limit = 10, offset = 0 }) => {
      const filter = {};
      
      if (tournamentId) filter.tournament = tournamentId;

      return await TournamentResult.find(filter)
        .sort({ publishedAt: -1 })
        .limit(limit)
        .skip(offset)
        .populate('tournament')
        .populate('uploadedBy', 'username email');
    },

    tournamentResult: async (_, { id }) => {
      const result = await TournamentResult.findById(id)
        .populate('tournament')
        .populate('uploadedBy', 'username email');
      
      if (!result) {
        throw new Error('Resultado no encontrado');
      }
      
      return result;
    }
  },

  Mutation: {
    createTournamentResult: async (_, { input, pdfUrl, pdfFileName, fileSize }, context) => {
      const user = requireAdmin(context);

      // Verificar que el torneo existe
      const tournament = await Tournament.findById(input.tournamentId);
      if (!tournament) {
        throw new Error('Torneo no encontrado');
      }

      const result = await TournamentResult.create({
        tournament: input.tournamentId,
        title: input.title,
        description: input.description,
        pdfUrl,
        pdfFileName,
        fileSize,
        uploadedBy: user.id,
        resultType: input.resultType || 'oficial',
        discipline: input.discipline,
        category: input.category,
        isPublished: input.isPublished !== undefined ? input.isPublished : true
      });

      return await result.populate([
        { path: 'tournament' },
        { path: 'uploadedBy', select: 'username email' }
      ]);
    },

    updateTournamentResult: async (_, { id, input }, context) => {
      requireAdmin(context);

      const result = await TournamentResult.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      )
        .populate('tournament')
        .populate('uploadedBy', 'username email');

      if (!result) {
        throw new Error('Resultado no encontrado');
      }

      return result;
    },

    deleteTournamentResult: async (_, { id }, context) => {
      requireAdmin(context);

      const result = await TournamentResult.findByIdAndDelete(id);

      if (!result) {
        throw new Error('Resultado no encontrado');
      }

      // Aquí podrías también eliminar el archivo PDF del servidor si lo deseas
      // deleteFile(path.join(__dirname, '../../../uploads/results/', result.pdfFileName));

      return true;
    },

    incrementResultDownloads: async (_, { id }) => {
      const result = await TournamentResult.findByIdAndUpdate(
        id,
        { $inc: { downloads: 1 } },
        { new: true }
      )
        .populate('tournament')
        .populate('uploadedBy', 'username email');

      if (!result) {
        throw new Error('Resultado no encontrado');
      }

      return result;
    }
  },

  TournamentResult: {
    id: (parent) => parent._id.toString(),
    tournament: async (parent) => {
      if (parent.tournament && parent.tournament._id) {
        return parent.tournament;
      }
      const result = await TournamentResult.findById(parent._id).populate('tournament');
      return result.tournament;
    },
    uploadedBy: async (parent) => {
      if (parent.uploadedBy && parent.uploadedBy._id) {
        return parent.uploadedBy;
      }
      const result = await TournamentResult.findById(parent._id).populate('uploadedBy', 'username email');
      return result.uploadedBy;
    }
  }
};
