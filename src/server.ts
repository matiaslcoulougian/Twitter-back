import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { corsWhitelist, currentEnv, isDevEnv } from '@/config';
import { setupDb } from '@/db';
import { logger } from '@/logger';

import { router } from './routers';

setupDb();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Emergencias API',
    version: '1.0.0',
    description: 'This is a REST API for Emergencias application.',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  // security: [{ bearerAuth: [] }]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './src/components/users/controllers/users.router.ts',
    './src/components/api/controllers/api.router.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();

if (isDevEnv || corsWhitelist === '*') {
  app.use(cors({ origin: '*' }));
} else {
  const whitelist = corsWhitelist.split(',');
  const corsOptions = {
    origin: (origin: any, callback: any) => {
      if (origin) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error());
        }
      } else {
        callback(null, true);
      }
    },
  };
  app.use(cors(corsOptions));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Add APIs
app.use('/api', router);

const port = process.env.PORT || '5000';
app.listen({ port }, () => {
  logger.info(`🚀  Server ready at http://localhost:${port}`);
  logger.info(`🌎  Current Environment: ${currentEnv}`);
});
