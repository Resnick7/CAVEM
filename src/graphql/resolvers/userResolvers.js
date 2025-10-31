import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const userResolvers = {
  Query: {
    me: async (_, __, context) => {
      requireAuth(context);
      return context.user;
    },

    users: async (_, __, context) => {
      requireAdmin(context);
      return await User.find().select('-password');
    },

    user: async (_, { id }, context) => {
      requireAdmin(context);
      return await User.findById(id).select('-password');
    }
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new Error('El usuario o email ya existe');
      }

      const user = await User.create({
        username,
        email,
        password,
        role: 'admin'
      });

      const token = generateToken(user._id);

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt
        }
      };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      const isValidPassword = await user.matchPassword(password);

      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      if (!user.isActive) {
        throw new Error('Usuario inactivo');
      }

      const token = generateToken(user._id);

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt
        }
      };
    },

    updateUser: async (_, { id, username, email, isActive }, context) => {
      requireAdmin(context);

      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (isActive !== undefined) updateData.isActive = isActive;

      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    },

    deleteUser: async (_, { id }, context) => {
      requireAdmin(context);

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return true;
    }
  }
};
