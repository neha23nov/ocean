require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const protectedRoutes = require('./routes/protected'); // optional

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/protected', protectedRoutes);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
