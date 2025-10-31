import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return { user: null };
    }

    return { user };
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    return { user: null };
  }
};

export const requireAuth = (context) => {
  if (!context.user) {
    throw new Error('No autorizado. Debes iniciar sesión.');
  }
  return context.user;
};

export const requireAdmin = (context) => {
  const user = requireAuth(context);
  
  if (user.role !== 'admin' && user.role !== 'superadmin') {
    throw new Error('No autorizado. Se requieren permisos de administrador.');
  }
  
  return user;
};
