import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
  bio: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String
  },
  specialties: [{
    type: String,
    trim: true
  }],
  certifications: [{
    name: String,
    institution: String,
    year: Number
  }],
  schedule: [{
    day: {
      type: String,
      enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    startTime: String,
    endTime: String,
    location: String,
    ageGroup: String,
    discipline: String
  }],
  experience: {
    type: Number,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String
  }
}, {
  timestamps: true
});

// Método virtual para obtener el nombre completo
teacherSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Configurar para que los virtuals se incluyan en JSON
teacherSchema.set('toJSON', { virtuals: true });
teacherSchema.set('toObject', { virtuals: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
