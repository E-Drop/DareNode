import axios from 'axios';
import config from 'config';
import errorsDispatcher from '../utils/errorsDispatcher.js';

const retrieveDataMiddleware = (...neededResources) => (
  async (req, res, next) => {
    const baseURI = config.get('API_BASE_URI');
    try {
      const login = await axios.post(`${baseURI}login`, {
        client_id: config.get('DARE_ID'),
        client_secret: config.get('DARE_SECRET')
      });

      if (neededResources && login) {
        neededResources.forEach(async resource => {
          if (resource) {
            const response = await axios.get(baseURI+resource, {
              headers: {
                Authorization: `Bearer ${login.data.token}`
              }
            });
            req[resource] = response.data;
            return next();
          } else {
            return errorsDispatcher(res, 'BAD_REQUEST');
          }
        });
      }
    } catch (err) {
      return errorsDispatcher(res, 'SERVER_ERROR');
    }
  }
);

export default retrieveDataMiddleware;