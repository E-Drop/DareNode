import pagination from "../utils/pagination.js";
import {
  populatePoliciesOnClient,
  populatePoliciesOnClients,
  filterClientsByName,
} from "../utils/clientUtils.js";
import { findById } from "../utils/findById.js";
import errorsDispatcher from "../utils/errorsDispatcher.js";

export const getClients = (req, res) => {
  const { user, clients, policies } = req;
  const { name, limit = null, page = null } = req.query;
  const rowsPerPage = limit ? +limit : 10;
  const currentPage = page ? +page : 1;

  let clientsList;

  console.log('ASDASDASDASD', policies, clients);
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

  if (clientsList.length < limit) {
    return res.send(clientsList);
  }

  return res.send(pagination(rowsPerPage, currentPage, clientsList));
};

export const getClientById = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;
  const client = findById(clients, id);
  if (client) {
    if (id === user.id || user.role === "admin") {
      return res.send(populatePoliciesOnClient(user, policies));
    } else {
      return errorsDispatcher(res, "FORBIDDEN");
    }
  }
  return errorsDispatcher(res, "NOT_FOUND");
};
