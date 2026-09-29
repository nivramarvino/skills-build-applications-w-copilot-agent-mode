import { Router, type Request, type Response } from 'express';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const apiRouter = Router();

const collectionResponse = (fetchRecords: () => Promise<unknown[]>) =>
  async (_request: Request, response: Response) => {
    try {
      response.json(await fetchRecords());
    } catch (error) {
      console.error('Error fetching API collection:', error);
      response.status(500).json({ error: 'Unable to fetch collection.' });
    }
  };

apiRouter.get('/users/', collectionResponse(() => User.find().lean()));
apiRouter.get('/teams/', collectionResponse(() => Team.find().lean()));
apiRouter.get('/activities/', collectionResponse(() => Activity.find().lean()));
apiRouter.get('/leaderboard/', collectionResponse(() => Leaderboard.find().sort({ rank: 1 }).lean()));
apiRouter.get('/workouts/', collectionResponse(() => Workout.find().lean()));

export default apiRouter;