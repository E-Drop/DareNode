import pagination from "../utils/pagination.js";
import {
  policiesWithoutClientId,
  policyWithoutClientId,
} from "../utils/eraseClientIdFromPolicies.js";
import errorsDispatcher from "../utils/errorsDispatcher.js";
import { findById } from "../utils/findById.js";

export const getPoliciesList = (req, res) => {
  const { user, policies } = req;
  const { role, id } = user;
  const { limit = null, page = null } = req.query;
  const rowsPerPage = limit ? +limit : 10;
  const currentPage = page ? +page : 1;
  const isAdmin = role === 'admin';

  if (!policies) {
    return errorsDispatcher(res, "NOT_FOUND");
  }

  const policiesList = policiesWithoutClientId(isAdmin ? policies : findById(policies, "clientId", id))
  
  if (policiesList.length < rowsPerPage) {
    return res.send(policiesList);
  }

  return res.send(pagination(rowsPerPage, currentPage, policiesList));
};

export const getPolicyById = (req, res) => {
  const { id } = req.params;
  const { user, policies } = req;
  const policy = findById(policies, "id", id);
  if (policy) {
    if (id === user.id || user.role === "admin") {
      return res.send(policyWithoutClientId(policy));
    } else {
      return errorsDispatcher(res, "FORBIDDEN");
    }
  }
  return errorsDispatcher(res, "NOT_FOUND");
};
