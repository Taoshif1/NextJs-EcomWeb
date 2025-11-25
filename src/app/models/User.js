import mongoose from 'mongoose';

// User Schema - defines what data we store for each user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: null,
  },
  provider: {
    type: String,
    default: 'credentials',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
export default mongoose.models.User || mongoose.model('User', UserSchema);