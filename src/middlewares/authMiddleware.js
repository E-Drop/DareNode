import config from "config";
import jwt from "jsonwebtoken";
import errorsDispatcher from "../utils/errorsDispatcher.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token || !token.includes("Bearer")) {
    return errorsDispatcher(res, "UNAUTHORIZED");
  }

  try {
    const tokenContent = token.split(" ")[1];
    const decoded = jwt.verify(tokenContent, config.get("SECRET_KEY"));
    req.user = decoded;
    next();
  } catch (err) {
    errorsDispatcher(res, "BAD_REQUEST");
  }
};

export default authMiddleware;
