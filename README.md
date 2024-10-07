# Tripleten web_project_api_full
Proyecto: web_project_api_full


Link del proyecto: https://www.auge25.mooo.com


Descripción:

Este proyecto es una aplicación web completa que implementa autenticación de usuario, autorización y un manejo de errores robusto. La aplicación se divide en un frontend y un backend.

Tecnologías utilizadas:

Backend: Node.js, Express, MongoDB, JWT
Frontend: React (o tu framework preferido)
Otros: Mongoose, Joi, bcrypt, cors
Estructura del Proyecto:

web_project_api_full/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── routes/
│   └── app.js
└── frontend/
    ├── src/
    ├── public/
    └── package.json
Características:

Registro e inicio de sesión de usuario con correo electrónico y contraseña
Autenticación basada en JWT
Autorización basada en roles
Manejo centralizado de errores
Despliegue en una plataforma en la nube (por ejemplo, Google Cloud)
Primeros pasos:

Clonar el repositorio:
Bash
git clone https://github.com/tu-nombre-de-usuario/web_project_api_full.git
Use code with caution.

Instalar dependencias:
Bash
cd backend
npm install
cd ../frontend
npm install
Use code with caution.

Configurar variables de entorno:
Crea un archivo .env en el directorio backend y establece tus variables de entorno (por ejemplo, URI de MongoDB, secreto JWT).

Ejecutar el servidor de desarrollo:
Bash
# Iniciar el servidor backend
cd backend
npm start

# Iniciar el servidor de desarrollo frontend
cd ../frontend
npm start
Use code with caution.

Validacion de datos:
Gracias a Celebrate y Joi, la aplicación garantiza la integridad de los datos ingresados en la base de datos. La elección de Google Cloud Platform proporciona escalabilidad y rendimiento. Certbot asegura la seguridad del sitio web mediante certificados SSL. Nginx optimiza el manejo de las solicitudes y PM2 garantiza la estabilidad de la aplicación.

Pasos clave:

Construir el paquete de producción frontend.
Implementar el backend en una plataforma en la nube.
Configurar un dominio y habilitar HTTPS.
Configurar Nginx o un proxy inverso similar para balanceo de carga y servicio de archivos estáticos.

