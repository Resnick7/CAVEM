import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import News from './src/models/News.js';
import Tournament from './src/models/Tournament.js';
import Teacher from './src/models/Teacher.js';
import TournamentResult from './src/models/TournamentResult.js';

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
    await TournamentResult.deleteMany({});

    // Crear usuario administrador
    console.log('👤 Creando usuario administrador...');
    const admin = await User.create({
      username: 'Admin',
      email: 'admin@cavem.com',
      password: 'admin123', // Se hasheará automáticamente
      role: 'admin'
    });

    // Crear profesores
    console.log('👨‍🏫 Creando profesores...');
    const teachers = await Teacher.create([
      {
        firstName: 'Norma',
        lastName: 'Contrera',
        email: 'necontrera@cavem.com',
        phone: '+54 261 123-4567',
        photoUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop',
        bio: 'Entrenadora con experiencia en lanzamientos y vallas.',
        specialties: ['Velocidad', 'Saltos', 'Vallas', 'Jabalina', 'Bala', 'Martillo'],
        experience: 20,
        schedule: [
          {
            day: 'Martes',
            startTime: '17:00',
            endTime: '20:00',
            location: 'Pista provincial de atletismo  de mendoza',
            ageGroup: 'Adolescentes y Adultos',
            discipline: 'Lanzamientos y Pista'
          },
          {
            day: 'Jueves',
            startTime: '17:00',
            endTime: '20:00',
            location: 'Pista provincial de atletismo  de mendoza',
            ageGroup: 'Adolescentes y Adultos',
            discipline: 'Lanzamientos y Pista'
          },
          {
            day: 'Sábado',
            startTime: '10:00',
            endTime: '12:00',
            location: 'Pista provincial de atletismo  de mendoza',
            ageGroup: 'Adolescentes y Adultos',
            discipline: 'Lanzamientos y Pista'
          }
        ],
        isActive: true
      },
      {
        firstName: 'Monica',
        lastName: 'Rojas',
        email: 'mrojas@cavem.com',
        phone: '+54 261 234-5678',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        bio: 'Entrenadora especializada en preparación infantil.',
        specialties: ['Fondo', 'Medio fondo', 'Maratón', 'Pista', 'Campo'],
        experience: 15,
        schedule: [
          {
            day: 'Martes',
            startTime: '17:00',
            endTime: '20:00',
            location: 'Parque General San Martín',
            ageGroup: 'Todos',
            discipline: 'Fondo'
          },
          {
            day: 'Jueves',
            startTime: '17:00',
            endTime: '20:00',
            location: 'Parque General San Martín',
            ageGroup: 'Todos',
            discipline: 'Medio Fondo'
          },
          {
            day: 'Sábado',
            startTime: '10:00',
            endTime: '12:00',
            location: 'Pista provincial de atletismo  de mendoza',
            ageGroup: 'Adolescentes y Adultos',
            discipline: 'Lanzamientos y Pista'
          }
        ],
        isActive: true
      },
      {
        firstName: 'Matías',
        lastName: 'Pscitelli',
        email: 'mpscitelli@cavem.com',
        phone: '+54 261 345-6789',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        bio: 'Especialista en saltos y gimnasio.',
        specialties: ['Largo', 'Alto', 'Triple', 'Garrocha'],
        experience: 18,
        schedule: [
          {
            day: 'Lunes',
            startTime: '17:00',
            endTime: '19:00',
            location: 'Estadio Malvinas Argentinas',
            ageGroup: 'Juveniles y Adultos',
            discipline: 'Gimnasio'
          },
          {
            day: 'Miércoles',
            startTime: '17:00',
            endTime: '19:00',
            location: 'Estadio Malvinas Argentinas',
            ageGroup: 'Juveniles y Adultos',
            discipline: 'Gimnasio'
          },
        ],
        isActive: true
      }
    ]);

    // Crear torneos
    console.log('🏆 Creando torneos...');
    const tournaments = await Tournament.create([
      {
        name: 'Campeonato Nacional Master 2025',
        description: 'XXII Campeonato Sudamericano de Atletismo Master',
        category: 'master',
        location: 'Estadio Malvinas Argentinas, Mendoza',
        date: new Date('2025-12-10'),
        endDate: new Date('2025-12-12'),
        registrationDeadline: new Date('2025-11-25'),
        registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdW01ZBxClp3uJt6eiPS_EwCsHHt6Rw6mzzJsKOgqRak6XeKw/viewform?usp=sharing&ouid=111714396674666937246',
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
        registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdW01ZBxClp3uJt6eiPS_EwCsHHt6Rw6mzzJsKOgqRak6XeKw/viewform?usp=sharing&ouid=111714396674666937246',
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
        registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdW01ZBxClp3uJt6eiPS_EwCsHHt6Rw6mzzJsKOgqRak6XeKw/viewform?usp=sharing&ouid=111714396674666937246',
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
        tags: ['Campeonato', 'Master', 'Mendoza'],
        author: admin._id,
        isPublished: true,
        views: 42
      },
      {
        title: 'Resultados destacados en el Torneo de Junio',
        content: 'Nuestros atletas obtuvieron excelentes resultados en el Torneo de Combinadas realizado en junio. Destacamos las actuaciones en largo y triple salto de las categorías juveniles.',
        excerpt: 'Excelentes resultados de CAVEM en el torneo de junio',
        category: 'logro',
        tags: ['Torneo', 'Resultados', 'Juveniles'],
        author: admin._id,
        isPublished: true,
        views: 38
      },
      {
        title: 'Inscripciones abiertas para clases 2026',
        content: 'Ya están abiertas las inscripciones para las clases de atletismo del ciclo 2026. Contamos con horarios para todas las edades, desde niños de 4 años hasta adultos mayores. Consultar horarios con nuestros profesores.',
        excerpt: 'Inscripciones abiertas para el ciclo 2026',
        category: 'anuncio',
        tags: ['Inscripciones', 'Clases', '2026'],
        author: admin._id,
        isPublished: true,
        views: 67
      },
      {
        title: 'Nuevo horario de entrenamiento para categoría master',
        content: 'A partir del mes próximo, los entrenamientos de la categoría master tendrán un nuevo horario. Las sesiones serán los lunes y miércoles de 19:00 a 21:00 en el Parque San Martín.',
        excerpt: 'Cambio de horarios para categoría master',
        category: 'anuncio',
        tags: ['Horarios', 'Master', 'Entrenamiento'],
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
