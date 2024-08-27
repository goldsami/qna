import express from 'express';
import Knex from 'knex';
import Router from './config/routes';
import dotenv from 'dotenv';
import { Model } from 'objection';
// @ts-ignore
import knexConfig from '../knexfile';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

dotenv.config()

const knex = Knex((knexConfig as any).development);
Model.knex(knex);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

const app = express();
const port = 8080 || process.env.PORT;

app.use(bodyParser.json());
app.use(limiter);
app.use(Router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
