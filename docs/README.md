## Inicio Rápido para que no se me olvide

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus datos

# 3. Cargar datos de prueba (opcional)
npm run seed

# 4. Iniciar servidor
npm run dev
```

**¡Listo!** El servidor estará en http://localhost:4000/graphql

---

# CAVEM Backend

Backend para el sitio web institucional del Círculo de Atletas Veteranos de Mendoza (CAVEM).

## Tecnologías

- **Node.js** con Express
- **GraphQL** con Apollo Server
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **Multer** para carga de archivos PDF ( o capaz que lo sacamos )

## Requisitos previos

- Node.js v18 o superior
- MongoDB instalado y corriendo
- npm o yarn

## Instalación

1. Clonar el repositorio o copiar los archivos

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configurar las variables de entorno en `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/cavem
PORT=4000
JWT_SECRET=tu_clave_secreta_segura
BASE_URL=http://localhost:4000
```

## Ejecutar el proyecto

### Modo desarrollo (nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en: `http://localhost:4000/graphql`


## Endpoints REST

### Health Check:
```
GET /health
```

### Subir PDF:
```
POST /upload-pdf
Content-Type: multipart/form-data
Body: pdf (archivo)
```

### Ver PDFs:
```
GET /uploads/results/{filename}
```

## Troubleshooting

### Error: "MongoDB connection failed"
- Verificar que MongoDB esté corriendo: `mongod`
- Verificar la URI en el archivo `.env`

### Error: "JWT Secret is not defined"
- Asegurarse de tener `JWT_SECRET` configurado en `.env`

### Error al subir archivos
- Verificar que la carpeta `uploads/results` exista
- Verificar permisos de escritura en la carpeta

## Autores

- Antonella Capadona
- Matías Collado
- Facundo Herrera


