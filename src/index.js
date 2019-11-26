/* eslint-disable no-console */
import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import Route from './Routes';
import FeedbackHandler from './Helpers/feedbackHandler';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
// www.ije-api.tcore.xyz

app.use('/v1/flight', Route);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  next();
});
app.use(FeedbackHandler.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server started on port ', PORT);
});

export default app;
