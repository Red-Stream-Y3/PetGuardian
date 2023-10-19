import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import colors from 'colors';
import findConfig from 'find-config';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import utilRoutes from './routes/utilRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import playDateRoutes from './routes/playDateRoutes.js';
import petRoutes from './routes/petRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import postRoutes from './routes/postRoutes.js';
import adoptionRoutes from './routes/adoptionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import asyncHandler from 'express-async-handler';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dbUri;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: findConfig('.env.dev') });
  dbUri = process.env.MONGO_URI_DEV;
} else dbUri = process.env.MONGO_URI;

connectDB(dbUri);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/util', utilRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/playdates', playDateRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/ratings', ratingRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/adoption', adoptionRoutes);

//payment gateway
app.use('/api/braintree', paymentRoutes);
app.get(
  '/braintree',
  asyncHandler((req, res) => {
    res.sendFile(path.join(__dirname, 'braintree.html'));
  })
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
  });
}

export default app;
