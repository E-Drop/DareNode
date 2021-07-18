import express from 'express';
import authorizationController from '../controllers/authorizationController.js';

const authorizationRouter = () => {
  const router = express.Router();

  router.route('/').post(authorizationController);

  return router;
};
export default authorizationRouter;