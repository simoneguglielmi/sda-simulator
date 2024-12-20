import 'reflect-metadata';
import errorHandler from '@/common/middleware/errorHandler';
import cors from 'cors';
import requestLogger from '@/common/middleware/requestLogger';
import rateLimiter from '@/common/middleware/rateLimiter';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { env } from '@/common/utils/envConfig';
import { sdaRouter } from './api/sda/sdaRouter';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.static('public'));
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use(`${env.BASE_ENDPOINT}/sda`, sdaRouter);

// Swagger UI
app.use(openAPIRouter);

app.use('/', (_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Error handlers
app.use(errorHandler());

export { app, logger };
