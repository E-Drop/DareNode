import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import NodeCache from 'node-cache';

import ensureLoginDataMiddleware from './middlewares/ensureLoginDataMiddleware.js';
import retrieveDataMiddleware from './middlewares/retrieveDataMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';

import authorizationRouter from './routes/authorizationRouter.js';
import clientsRouter from './routes/clientsRouter.js';
import policiesRouter from './routes/policiesRouter.js';

import errorsDispatcher from './utils/errorsDispatcher.js';

import session from 'express-session';

const app = express();
const port = config.get('PORT');
const dataCache = new NodeCache();

app.use(session({
  secret: config.get('SECRET_SESSION'),
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', ensureLoginDataMiddleware, retrieveDataMiddleware(dataCache, 'clients'), authorizationRouter());
app.use('/clients', authMiddleware, retrieveDataMiddleware(dataCache, 'clients', 'policies'), clientsRouter());
app.use('/policies', authMiddleware, retrieveDataMiddleware(dataCache, 'policies'), policiesRouter());

app.use((req, res) => {
  errorsDispatcher(res, 'BAD_REQUEST');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
