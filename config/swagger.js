const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const DB_PORT = process.env.DB_PORT || 3001;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FindCourse API',
      version: '1.0.0',
      description: 'API documentation for managing categories',
    },
    servers: [
      {
        url: `http://localhost:3000/api`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
