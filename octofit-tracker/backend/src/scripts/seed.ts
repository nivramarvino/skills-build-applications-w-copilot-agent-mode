import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya-chen', email: 'maya.chen@example.com', fullName: 'Maya Chen', age: 15, fitnessLevel: 'intermediate', points: 500 },
      { username: 'liam-patel', email: 'liam.patel@example.com', fullName: 'Liam Patel', age: 14, fitnessLevel: 'beginner', points: 440 },
      { username: 'ava-thompson', email: 'ava.thompson@example.com', fullName: 'Ava Thompson', age: 16, fitnessLevel: 'advanced', points: 480 },
    ]);

    const teams = await Team.create([
      { name: 'Trailblazers', description: 'A team that loves running and outdoor challenges.', members: [users[0]._id, users[1]._id], points: 940 },
      { name: 'Power Pulse', description: 'A team focused on strength, consistency, and personal bests.', members: [users[2]._id], points: 480 },
    ]);

    await User.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id });

    await Activity.create([
      { user: users[0]._id, team: teams[0]._id, activityType: 'running', durationMinutes: 32, distanceKm: 4.2, points: 320, completedAt: new Date() },
      { user: users[0]._id, team: teams[0]._id, activityType: 'strength training', durationMinutes: 30, points: 180, completedAt: new Date() },
      { user: users[1]._id, team: teams[0]._id, activityType: 'walking', durationMinutes: 45, distanceKm: 3.6, points: 240, completedAt: new Date() },
      { user: users[1]._id, team: teams[0]._id, activityType: 'strength training', durationMinutes: 25, points: 200, completedAt: new Date() },
      { user: users[2]._id, team: teams[1]._id, activityType: 'running', durationMinutes: 35, distanceKm: 5.1, points: 350, completedAt: new Date() },
      { user: users[2]._id, team: teams[1]._id, activityType: 'walking', durationMinutes: 30, distanceKm: 2.4, points: 130, completedAt: new Date() },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 500, rank: 1, period: 'monthly', periodStart: new Date() },
      { user: users[2]._id, team: teams[1]._id, points: 480, rank: 2, period: 'monthly', periodStart: new Date() },
      { user: users[1]._id, team: teams[0]._id, points: 440, rank: 3, period: 'monthly', periodStart: new Date() },
    ]);

    await Workout.create([
      { title: 'After-School Walk', description: 'A relaxed walk to build a consistent movement habit.', activityType: 'walking', fitnessLevel: 'beginner', durationMinutes: 25, exercises: ['Easy-paced walk', 'Gentle cooldown'] },
      { title: 'Steady 5K Builder', description: 'A balanced run-walk session that builds endurance.', activityType: 'running', fitnessLevel: 'intermediate', durationMinutes: 35, exercises: ['5-minute warm-up', '3-minute run and 2-minute walk intervals', '5-minute cooldown'] },
      { title: 'Bodyweight Basics', description: 'A short strength session using controlled bodyweight movements.', activityType: 'strength training', fitnessLevel: 'beginner', durationMinutes: 20, exercises: ['Squats', 'Wall push-ups', 'Glute bridges', 'Plank'] },
    ]);

    console.log('Seeded 3 users, 2 teams, 6 activities, 3 leaderboard entries, and 3 workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
