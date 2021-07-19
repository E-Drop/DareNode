import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

import ensureLoginDataMiddleware from './middlewares/ensureLoginDataMiddleware.js';
import retrieveDataMiddleware from './middlewares/retrieveDataMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';

import authorizationRouter from './routes/authorizationRouter.js';
import clientsRouter from './routes/clientsRouter.js';
import policiesRouter from './routes/policiesRouter.js';

import errorsDispatcher from './utils/errorsDispatcher.js';

const app = express();
const port = config.get('PORT');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', ensureLoginDataMiddleware, retrieveDataMiddleware('clients'), authorizationRouter());
app.use('/clients', authMiddleware, retrieveDataMiddleware('clients', 'policies'), clientsRouter());
app.use('/policies', authMiddleware, retrieveDataMiddleware('policies'), policiesRouter());

app.use((req, res) => {
  errorsDispatcher(res, 'BAD_REQUEST');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
