import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'leído', 'respondido', 'archivado'],
    default: 'pendiente'
  },
  category: {
    type: String,
    enum: ['consulta', 'inscripción', 'queja', 'sugerencia', 'otro'],
    default: 'consulta'
  },
  responseNote: {
    type: String
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Índice para búsquedas
contactSchema.index({ status: 1, createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
