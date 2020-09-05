import express from 'express';
import setupSwagger from './config-swagger';
import setupMiddleware from './middlewares';
import setupStaticFiles from './static-files';
import setupRoutes from './routes';

const app = express();
setupStaticFiles(app);
setupSwagger(app);
setupMiddleware(app);
setupRoutes(app);
export default app;
