import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import News from './src/models/News.js';
import Tournament from './src/models/Tournament.js';
import Teacher from './src/models/Teacher.js';

dotenv.config();

const seedData = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes (opcional)
    console.log('🗑️  Limpiando datos existentes...');
    await User.deleteMany({});
    await News.deleteMany({});
    await Tournament.deleteMany({});
    await Teacher.deleteMany({});

    // Crear usuario administrador
    console.log('👤 Creando usuario administrador...');
    const admin = await User.create({
      username: 'admin',
      email: 'admin@cavem.com',
      password: 'admin123', // Se hasheará automáticamente
      role: 'admin'
    });

    // Crear profesores
    console.log('👨‍🏫 Creando profesores...');
    const teachers = await Teacher.create([
      {
        firstName: 'Carlos',
        lastName: 'Martínez',
        email: 'carlos@cavem.com',
        phone: '+54 261 123-4567',
        bio: 'Especialista en velocidad y saltos con 20 años de experiencia',
        specialties: ['velocidad', 'saltos', 'vallas'],
        experience: 20,
        schedule: [
          {
            day: 'Lunes',
            startTime: '18:00',
            endTime: '20:00',
            location: 'Pista Municipal',
            ageGroup: 'Adultos',
            discipline: 'Velocidad'
          },
          {
            day: 'Miércoles',
            startTime: '18:00',
            endTime: '20:00',
            location: 'Pista Municipal',
            ageGroup: 'Adultos',
            discipline: 'Saltos'
          }
        ],
        isActive: true
      },
      {
        firstName: 'Laura',
        lastName: 'Fernández',
        email: 'laura@cavem.com',
        phone: '+54 261 234-5678',
        bio: 'Entrenadora especializada en fondo y medio fondo',
        specialties: ['fondo', 'medio fondo', 'maratón'],
        experience: 15,
        schedule: [
          {
            day: 'Martes',
            startTime: '19:00',
            endTime: '21:00',
            location: 'Parque General San Martín',
            ageGroup: 'Todos',
            discipline: 'Fondo'
          },
          {
            day: 'Jueves',
            startTime: '19:00',
            endTime: '21:00',
            location: 'Parque General San Martín',
            ageGroup: 'Todos',
            discipline: 'Medio Fondo'
          }
        ],
        isActive: true
      },
      {
        firstName: 'Roberto',
        lastName: 'Gómez',
        email: 'roberto@cavem.com',
        phone: '+54 261 345-6789',
        bio: 'Especialista en lanzamientos y pruebas de campo',
        specialties: ['lanzamiento de bala', 'disco', 'jabalina'],
        experience: 18,
        schedule: [
          {
            day: 'Viernes',
            startTime: '17:00',
            endTime: '19:00',
            location: 'Estadio Malvinas Argentinas',
            ageGroup: 'Juveniles y Adultos',
            discipline: 'Lanzamientos'
          }
        ],
        isActive: true
      }
    ]);

    // Crear torneos
    console.log('🏆 Creando torneos...');
    const tournaments = await Tournament.create([
      {
        name: 'Campeonato Nacional Master 2025',
        description: 'XXII Campeonato Sudamericano de Atletismo Master - Participación de CAVEM con atletas destacados',
        category: 'master',
        location: 'Estadio Malvinas Argentinas, Mendoza',
        date: new Date('2025-12-10'),
        endDate: new Date('2025-12-12'),
        registrationDeadline: new Date('2025-11-25'),
        registrationLink: 'https://forms.google.com/campeonato-nacional',
        disciplines: ['100m', '200m', '400m', 'salto largo', 'lanzamiento de bala'],
        ageCategories: ['M35', 'M40', 'M45', 'M50', 'M55', 'M60'],
        status: 'próximo',
        organizer: 'Asociación Mendocina de Atletismo Masters',
        contactInfo: {
          email: 'info@amamaster.com.ar',
          phone: '+54 261 456-7890'
        },
        isPublished: true
      },
      {
        name: 'Torneo de Pista y Campo - Junio 2025',
        description: 'Torneo de combinadas en homenaje a Carlos Ángel Gagliano. Participación de categorías U14, U16, U18 y U20.',
        category: 'general',
        location: 'Pista Municipal de Godoy Cruz',
        date: new Date('2025-06-07'),
        endDate: new Date('2025-06-08'),
        registrationDeadline: new Date('2025-05-30'),
        disciplines: ['largo', 'triple salto'],
        ageCategories: ['U14', 'U16', 'U18', 'U20'],
        status: 'finalizado',
        organizer: 'CAVEM',
        isPublished: true
      },
      {
        name: 'Campeonato Provincial Master',
        description: 'Campeonato provincial de atletismo para categorías master',
        category: 'master',
        location: 'Velódromo de Mendoza',
        date: new Date('2026-03-15'),
        registrationDeadline: new Date('2026-03-01'),
        disciplines: ['100m', '200m', '800m', '1500m'],
        ageCategories: ['M35', 'M40', 'M45', 'M50'],
        status: 'próximo',
        isPublished: true
      }
    ]);

    // Crear noticias
    console.log('📰 Creando noticias...');
    await News.create([
      {
        title: 'CAVEM presente en el Campeonato Nacional Master 2025',
        content: 'El Círculo de Atletas Veteranos de Mendoza participará activamente en el XXII Campeonato Sudamericano de Atletismo Master que se realizará en el Estadio Malvinas Argentinas. Contamos con una delegación de 15 atletas que competirán en diversas disciplinas.',
        excerpt: 'CAVEM participará con 15 atletas en el campeonato sudamericano',
        category: 'torneo',
        tags: ['campeonato', 'master', 'mendoza'],
        author: admin._id,
        isPublished: true,
        views: 42
      },
      {
        title: 'Resultados destacados en el Torneo de Junio',
        content: 'Nuestros atletas obtuvieron excelentes resultados en el Torneo de Combinadas realizado en junio. Destacamos las actuaciones en largo y triple salto de las categorías juveniles.',
        excerpt: 'Excelentes resultados de CAVEM en el torneo de junio',
        category: 'logro',
        tags: ['torneo', 'resultados', 'juveniles'],
        author: admin._id,
        isPublished: true,
        views: 38
      },
      {
        title: 'Inscripciones abiertas para clases 2026',
        content: 'Ya están abiertas las inscripciones para las clases de atletismo del ciclo 2026. Contamos con horarios para todas las edades, desde niños de 4 años hasta adultos mayores. Consultar horarios con nuestros profesores.',
        excerpt: 'Inscripciones abiertas para el ciclo 2026',
        category: 'anuncio',
        tags: ['inscripciones', 'clases', '2026'],
        author: admin._id,
        isPublished: true,
        views: 67
      },
      {
        title: 'Nuevo horario de entrenamiento para categoría master',
        content: 'A partir del mes próximo, los entrenamientos de la categoría master tendrán un nuevo horario. Las sesiones serán los lunes y miércoles de 19:00 a 21:00 en el Parque San Martín.',
        excerpt: 'Cambio de horarios para categoría master',
        category: 'anuncio',
        tags: ['horarios', 'master', 'entrenamiento'],
        author: admin._id,
        isPublished: true,
        views: 28
      }
    ]);

    console.log('✅ Datos de prueba creados exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`👤 Usuario administrador: admin@cavem.com / admin123`);
    console.log(`👨‍🏫 Profesores creados: ${teachers.length}`);
    console.log(`🏆 Torneos creados: ${tournaments.length}`);
    console.log(`📰 Noticias creadas: 4`);
    console.log('\n🚀 Puedes iniciar sesión con:');
    console.log('   Email: admin@cavem.com');
    console.log('   Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear datos de prueba:', error);
    process.exit(1);
  }
};

seedData();
