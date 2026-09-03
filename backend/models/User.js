const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Sirf email unique honi chahiye
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Yeh trick overwrite error ko rokne ke liye hai
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);