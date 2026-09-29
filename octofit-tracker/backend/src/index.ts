import './config/database.js';
import cors from 'cors';
import express from 'express';
import apiRouter from './routes/index.js';
import { apiBaseUrl, frontendBaseUrl } from './config/urls.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(cors({ origin: frontendBaseUrl }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api', apiRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});