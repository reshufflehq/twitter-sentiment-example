import express from 'express';
import { defaultHandler } from '@reshuffle/server-function';
const devDBAdmin = require('@reshuffle/db-admin');

const app = express();
app.set('trust proxy', true);

// DEV ONLY: uncomment the follow line to admin your local or cloud DB (served this path: /dev-only/db-admin  )
//devDBAdmin.initDevDBAdmin(app);
app.use("/dev/db-admin", express.json(), devDBAdmin.devDBAdminHandler);

app.use(defaultHandler);

export default app;
