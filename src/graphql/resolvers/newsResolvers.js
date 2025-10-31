import News from '../../models/News.js';
import { requireAdmin } from '../../middleware/auth.js';

export const newsResolvers = {
  Query: {
    news: async (_, { limit = 10, offset = 0, category, isPublished }) => {
      const filter = {};
      
      if (category) filter.category = category;
      if (isPublished !== undefined) filter.isPublished = isPublished;

      return await News.find(filter)
        .sort({ publishedAt: -1 })
        .limit(limit)
        .skip(offset)
        .populate('author', 'username email');
    },

    newsItem: async (_, { id }) => {
      const news = await News.findById(id).populate('author', 'username email');
      
      if (!news) {
        throw new Error('Noticia no encontrada');
      }
      
      return news;
    },

    searchNews: async (_, { query }) => {
      return await News.find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .populate('author', 'username email');
    }
  },

  Mutation: {
    createNews: async (_, { input }, context) => {
      const user = requireAdmin(context);

      const news = await News.create({
        ...input,
        author: user.id
      });

      return await news.populate('author', 'username email');
    },

    updateNews: async (_, { id, input }, context) => {
      requireAdmin(context);

      const news = await News.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      ).populate('author', 'username email');

      if (!news) {
        throw new Error('Noticia no encontrada');
      }

      return news;
    },

    deleteNews: async (_, { id }, context) => {
      requireAdmin(context);

      const news = await News.findByIdAndDelete(id);

      if (!news) {
        throw new Error('Noticia no encontrada');
      }

      return true;
    },

    incrementNewsViews: async (_, { id }) => {
      const news = await News.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      ).populate('author', 'username email');

      if (!news) {
        throw new Error('Noticia no encontrada');
      }

      return news;
    }
  },

  News: {
    id: (parent) => parent._id.toString(),
    author: async (parent) => {
      if (parent.author && parent.author._id) {
        return parent.author;
      }
      // Si no está populado, lo traemos
      const news = await News.findById(parent._id).populate('author', 'username email');
      return news.author;
    }
  }
};
