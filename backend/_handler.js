import express from 'express';
import { defaultHandler } from '@reshuffle/server-function';
const devDBAdmin = require('./_dev_db_admin');

const app = express();
app.set('trust proxy', true);

// DEV ONLY: uncomment the follow line to admin your local or cloud DB (served this path: /dev-only/db-admin  )
devDBAdmin.initDevDBAdmin(app);

app.use(defaultHandler);

export default app;
