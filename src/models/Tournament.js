import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['master', 'juvenil', 'infantil', 'general'],
    default: 'general'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  registrationDeadline: {
    type: Date
  },
  registrationLink: {
    type: String,
    trim: true
  },
  disciplines: [{
    type: String,
    trim: true
  }],
  ageCategories: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['próximo', 'en_curso', 'finalizado', 'cancelado'],
    default: 'próximo'
  },
  imageUrl: {
    type: String
  },
  organizer: {
    type: String,
    trim: true
  },
  contactInfo: {
    email: String,
    phone: String
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índice para búsquedas y ordenamiento por fecha
tournamentSchema.index({ date: 1, status: 1 });

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
