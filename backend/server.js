import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API /');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.findIndex((product) => product._id === req.params.id);
  res.json(products[product]);
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running |${process.env.NODE_ENV}| mode on port ${PORT}`));
