import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Team ?? mongoose.model('Team', teamSchema);