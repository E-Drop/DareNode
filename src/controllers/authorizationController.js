import jwt from 'jsonwebtoken';
import config from 'config';
import errorsDispatcher from '../utils/errorsDispatcher.js';

const authorizationController = (req, res) => {
  const { username, password } = req.body;

  const { clients } = req;

  if (!clients) {
    return errorsDispatcher(res, 'NOT_FOUND');
  }

  const logedUser = clients.find(
    client => client.name === username && client.email === password
  );

  if (logedUser) {
    const token = jwt.sign(logedUser, config.get('SECRET_KEY'), {
      expiresIn: 900
    });
    req.session.logedUser = logedUser;
    return res.send({ token, type: 'Bearer', expires_in: 900 });
  }
  return errorsDispatcher(res, 'UNAUTHORIZED');
};

export default authorizationController;