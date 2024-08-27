import express from 'express';
import Knex from 'knex';
import Router from './config/routes';
import dotenv from 'dotenv';
import { Model } from 'objection';
// @ts-ignore
import knexConfig from '../knexfile';
import bodyParser from 'body-parser';

dotenv.config()

const knex = Knex((knexConfig as any).development);
Model.knex(knex);

const app = express();
const port = 8080 || process.env.PORT;

app.use(bodyParser.json());
app.use(Router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
