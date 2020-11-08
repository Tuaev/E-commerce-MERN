import express from 'express';
import dotenv from 'dotenv';
import 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('API /');
});

app.use('/api/products', productRoutes);

app.listen(
  PORT,
  console.log(`Server running |${process.env.NODE_ENV}| mode on port ${PORT}`.brightYellow)
);
