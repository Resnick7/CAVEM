import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TournamentResult from './src/models/TournamentResult.js';
import Tournament from './src/models/Tournament.js';
import User from './src/models/User.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPDFs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Obtener el admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('❌ No se encontró un usuario admin');
      process.exit(1);
    }

    // Obtener un torneo (o crear uno si no existe)
    let tournament = await Tournament.findOne();
    if (!tournament) {
      console.log('📝 Creando torneo de ejemplo...');
      tournament = await Tournament.create({
        name: 'Torneo Ejemplo',
        description: 'Torneo de ejemplo para cargar resultados',
        location: 'Mendoza',
        date: new Date(),
        status: 'finalizado',
        isPublished: true
      });
    }

    // Leer PDFs de la carpeta uploads/results
    const uploadsPath = path.join(__dirname, 'uploads/results');
    
    if (!fs.existsSync(uploadsPath)) {
      console.log('📁 Creando carpeta uploads/results...');
      fs.mkdirSync(uploadsPath, { recursive: true });
      console.log('⚠️  Coloca tus PDFs en la carpeta uploads/results y ejecuta este script de nuevo');
      process.exit(0);
    }

    const files = fs.readdirSync(uploadsPath).filter(file => 
      file.endsWith('.pdf')
    );

    if (files.length === 0) {
      console.log('⚠️  No se encontraron archivos PDF en uploads/results');
      process.exit(0);
    }

    console.log(`📄 Encontrados ${files.length} archivos PDF`);

    // Registrar cada PDF en la base de datos
    for (const filename of files) {
      const filePath = path.join(uploadsPath, filename);
      const stats = fs.statSync(filePath);
      
      // Verificar si ya existe
      const existing = await TournamentResult.findOne({ pdfFileName: filename });
      
      if (existing) {
        console.log(`⏭️  Saltando ${filename} (ya existe)`);
        continue;
      }

      const pdfUrl = `${process.env.BASE_URL}/uploads/results/${filename}`;
      
      await TournamentResult.create({
        tournament: tournament._id,
        title: `Resultados - ${filename.replace('.pdf', '').replace(/-/g, ' ')}`,
        description: 'Resultados del torneo',
        pdfUrl,
        pdfFileName: filename,
        fileSize: stats.size,
        uploadedBy: admin._id,
        resultType: 'oficial',
        isPublished: true
      });

      console.log(`✅ Registrado: ${filename}`);
    }

    console.log('\n🎉 ¡Todos los PDFs han sido registrados!');
    console.log(`\n📊 Resumen:`);
    console.log(`   - Torneo: ${tournament.name}`);
    console.log(`   - PDFs registrados: ${files.length}`);
    console.log(`\n🔗 URLs de acceso:`);
    console.log(`   - Ver: ${process.env.BASE_URL}/uploads/results/{filename}`);
    console.log(`   - Descargar: ${process.env.BASE_URL}/download-pdf/{filename}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedPDFs();