import express from 'express';

import { getPoliciesList, getPolicyById } from '../controllers/policiesController.js';

const policiesRouter = () => {
  const router = express.Router();

  router.route('/').get(getPoliciesList);

  router.route('/:id').get(getPolicyById);

  return router;
};

export default policiesRouter;