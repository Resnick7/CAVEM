import Teacher from '../../models/Teacher.js';
import { requireAdmin } from '../../middleware/auth.js';

export const teacherResolvers = {
  Query: {
    teachers: async (_, { isActive }) => {
      const filter = {};
      
      if (isActive !== undefined) filter.isActive = isActive;

      return await Teacher.find(filter).sort({ lastName: 1, firstName: 1 });
    },

    teacher: async (_, { id }) => {
      const teacher = await Teacher.findById(id);
      
      if (!teacher) {
        throw new Error('Profesor no encontrado');
      }
      
      return teacher;
    },

    teachersBySpecialty: async (_, { specialty }) => {
      return await Teacher.find({
        specialties: { $in: [specialty] },
        isActive: true
      }).sort({ lastName: 1, firstName: 1 });
    }
  },

  Mutation: {
    createTeacher: async (_, { input }, context) => {
      requireAdmin(context);

      const teacher = await Teacher.create(input);
      return teacher;
    },

    updateTeacher: async (_, { id, input }, context) => {
      requireAdmin(context);

      const teacher = await Teacher.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      );

      if (!teacher) {
        throw new Error('Profesor no encontrado');
      }

      return teacher;
    },

    deleteTeacher: async (_, { id }, context) => {
      requireAdmin(context);

      const teacher = await Teacher.findByIdAndDelete(id);

      if (!teacher) {
        throw new Error('Profesor no encontrado');
      }

      return true;
    }
  },

  Teacher: {
    id: (parent) => parent._id.toString(),
    fullName: (parent) => `${parent.firstName} ${parent.lastName}`
  }
};
