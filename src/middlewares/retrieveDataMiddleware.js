import axios from "axios";
import config from "config";
import errorsDispatcher from "../utils/errorsDispatcher.js";

const retrieveDataMiddleware =
  (dataCache, ...neededResources) =>
  async (req, res, next) => {
    const baseURI = config.get("API_BASE_URI");
    try {
      const login = await axios.post(`${baseURI}login`, {
        client_id: config.get("DARE_ID"),
        client_secret: config.get("DARE_SECRET"),
      });

      if (neededResources && login) {
        for (const resource of neededResources) {
          if (resource) {
            const header = {
              headers: {
                Authorization: `Bearer ${login.data.token}`,
              },
            };
            const etag = `etag${resource}`;

            if (dataCache.has(etag)) {
              requestHeaders.headers["If-None-Match"] = dataCache.get(etag);
            }
            try {
              const response = await axios.get(baseURI + resource, header);
              dataCache.set(etag, response.headers.etag);
              dataCache.set(resource, response.data);
              req[resource] = response.data;
            } catch (err) {
              if (err.response.status === 304) {
                req.clients = dataCache.has("clients")
                  ? dataCache.get("clients")
                  : [];
                req.policies = dataCache.has("policies")
                  ? dataCache.get("policies")
                  : [];
              }
            }
          } else {
            return errorsDispatcher(res, "BAD_REQUEST");
          }
        }
        return next();
      }
    } catch (err) {
      return errorsDispatcher(res, "SERVER_ERROR");
    }
  };

export default retrieveDataMiddleware;
