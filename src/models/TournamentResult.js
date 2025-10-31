import mongoose from 'mongoose';

const tournamentResultSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  pdfFileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resultType: {
    type: String,
    enum: ['oficial', 'preliminar', 'parcial'],
    default: 'oficial'
  },
  discipline: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índice para búsquedas
tournamentResultSchema.index({ tournament: 1, publishedAt: -1 });

const TournamentResult = mongoose.model('TournamentResult', tournamentResultSchema);

export default TournamentResult;
