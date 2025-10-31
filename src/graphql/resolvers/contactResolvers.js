import Contact from '../../models/Contact.js';
import { requireAdmin } from '../../middleware/auth.js';

export const contactResolvers = {
  Query: {
    contacts: async (_, { status, category, limit = 20, offset = 0 }, context) => {
      requireAdmin(context);

      const filter = {};
      
      if (status) filter.status = status;
      if (category) filter.category = category;

      return await Contact.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset)
        .populate('respondedBy', 'username email');
    },

    contact: async (_, { id }, context) => {
      requireAdmin(context);

      const contact = await Contact.findById(id)
        .populate('respondedBy', 'username email');
      
      if (!contact) {
        throw new Error('Mensaje de contacto no encontrado');
      }
      
      return contact;
    },

    pendingContacts: async (_, __, context) => {
      requireAdmin(context);

      return await Contact.find({ status: 'pendiente' })
        .sort({ createdAt: -1 })
        .limit(10);
    }
  },

  Mutation: {
    createContact: async (_, { input }) => {
      // Este mutation NO requiere autenticación (cualquiera puede enviar un mensaje)
      const contact = await Contact.create(input);
      return contact;
    },

    updateContact: async (_, { id, input }, context) => {
      requireAdmin(context);

      const contact = await Contact.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      ).populate('respondedBy', 'username email');

      if (!contact) {
        throw new Error('Mensaje de contacto no encontrado');
      }

      return contact;
    },

    deleteContact: async (_, { id }, context) => {
      requireAdmin(context);

      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        throw new Error('Mensaje de contacto no encontrado');
      }

      return true;
    },

    markContactAsRead: async (_, { id }, context) => {
      requireAdmin(context);

      const contact = await Contact.findByIdAndUpdate(
        id,
        { status: 'leído' },
        { new: true }
      ).populate('respondedBy', 'username email');

      if (!contact) {
        throw new Error('Mensaje de contacto no encontrado');
      }

      return contact;
    },

    markContactAsResponded: async (_, { id, responseNote }, context) => {
      const user = requireAdmin(context);

      const contact = await Contact.findByIdAndUpdate(
        id,
        {
          status: 'respondido',
          responseNote,
          respondedBy: user.id,
          respondedAt: new Date()
        },
        { new: true }
      ).populate('respondedBy', 'username email');

      if (!contact) {
        throw new Error('Mensaje de contacto no encontrado');
      }

      return contact;
    }
  },

  Contact: {
    id: (parent) => parent._id.toString(),
    respondedBy: async (parent) => {
      if (!parent.respondedBy) return null;
      
      if (parent.respondedBy._id) {
        return parent.respondedBy;
      }
      
      const contact = await Contact.findById(parent._id).populate('respondedBy', 'username email');
      return contact.respondedBy;
    }
  }
};
