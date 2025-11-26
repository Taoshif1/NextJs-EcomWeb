import mongoose from '../lib/mongodb';

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
    // When using credentials, we need the password field to be retrievable
    // for bcrypt comparison, so we don't use 'select: false' here.
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

// Use existing model or compile a new one
export default mongoose.models.User || mongoose.model('User', UserSchema);