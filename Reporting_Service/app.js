import express from 'express';
import { json } from 'body-parser';
import connectDB from './config/database';
import dotenv from 'dotenv';
dotenv.config(); 

import salesRoutes from './Router/sales_router.js';

const app = express();
connectDB();

app.use(json());
app.use('/sales',salesRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
