import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    activityType: { type: String, enum: ['walking', 'running', 'strength training'], required: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);