import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import connectDB from './config/database.js';
import { typeDefs } from './graphql/typeDefs/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import { authenticate } from './middleware/auth.js';
import { uploadPDF, getFileUrl } from './utils/fileUpload.js';

dotenv.config();

// Necesario para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear app
const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a DB
connectDB();

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/* -------------------------------------------------
   📥 RUTA DE DESCARGA DE PDFs
--------------------------------------------------- */
app.get('/download-pdf/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/results', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    return res.download(filePath);
  } catch (error) {
    console.error("Error al descargar archivo:", error);
    res.status(500).json({ error: 'Error al descargar el archivo' });
  }
});

/* -------------------------------------------------
   📤 RUTA DE SUBIDA DE PDFs
--------------------------------------------------- */
app.post('/upload-pdf', uploadPDF.single('pdf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const fileUrl = getFileUrl(req.file.filename);

    res.json({
      success: true,
      message: 'Archivo subido exitosamente',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
});

/* -------------------------------------------------
   ❤️ HEALTH CHECK
--------------------------------------------------- */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CAVEM Backend está funcionando',
    timestamp: new Date().toISOString()
  });
});

/* -------------------------------------------------
   🚀 APOLLO SERVER
--------------------------------------------------- */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path
    };
  }
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { user } = await authenticate(req);
        return { user };
      }
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 GraphQL Playground en http://localhost:${PORT}/graphql`);
    console.log(`📁 Archivos en http://localhost:${PORT}/uploads`);
  });
}

startServer().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});
