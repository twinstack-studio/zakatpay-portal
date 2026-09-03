require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully');
    
    // YEH CHOTA SA CODE DATABASE SE PURANE PHONE WALE ERROR KO DELETE KAR DEGA
    try {
      await mongoose.connection.collection('users').dropIndex('phone_1');
      console.log('✅ Purana Phone wala error database se delete ho gaya!');
    } catch (e) {
      // Agar pehle se delete ho chuka hai toh chup raho
    }
  })
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user')); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`ZakatPay Backend running on http://localhost:${PORT}`);
});