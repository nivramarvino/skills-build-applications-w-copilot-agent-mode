import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 10, max: 19 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.User ?? mongoose.model('User', userSchema);