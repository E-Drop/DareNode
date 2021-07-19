import pagination from "../utils/pagination.js";
import {
  populatePoliciesOnClient,
  populatePoliciesOnClients,
  filterClientsByName,
} from "../utils/clientsUtils.js";
import { findById } from "../utils/findById.js";
import errorsDispatcher from "../utils/errorsDispatcher.js";
import { policiesWithoutClientId } from "../utils/eraseClientIdFromPolicies.js";

export const getClients = (req, res) => {
  const { user, clients, policies } = req;
  const { name, limit = null, page = null } = req.query;
  const rowsPerPage = limit ? +limit : 10;
  const currentPage = page ? +page : 1;

  let clientsList;

  if (user.role === "user") {
    clientsList = [
      populatePoliciesOnClient(
        clients.find((client) => client.id === user.id),
        policies
      ),
    ];
  } else {
    clientsList = name
      ? populatePoliciesOnClients(filterClientsByName(name, clients), policies)
      : populatePoliciesOnClients(clients, policies);
  }

  if (clientsList.length < rowsPerPage) {
    return res.send(clientsList);
  }

  return res.send(pagination(rowsPerPage, currentPage, clientsList));
};

export const getClientById = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;
  const client = findById(clients, "id", id);
  if (client) {
    if (id === user.id || user.role === "admin") {
      return res.send(populatePoliciesOnClient(user, policies));
    } else {
      return errorsDispatcher(res, "FORBIDDEN");
    }
  }
  return errorsDispatcher(res, "NOT_FOUND");
};

export const getClientPoliciesById = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;
  const client = findById(clients, "id", id);
  
  if (client) {
    const policy = policies.filter((policy) => policy.clientId === id);
    if (policy) {
      if (id === user.id || user.role === "admin") {
        return res.send(policiesWithoutClientId(policiesList));
      } else {
        return errorsDispatcher(res, "FORBIDDEN");
      }
    }
  }
  return errorsDispatcher(res, "NOT_FOUND");
};
