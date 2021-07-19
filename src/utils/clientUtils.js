export const populatePoliciesOnClient = (client, policies) => {
  let clientPolicies = policies.find(policy => policy.clientId === client.id);
  client.policies = {};
  if (clientPolicies) {
    client.policies = policiesWithoutClientId(clientPolicies);
  }
  return client;
};

export const populatePoliciesOnClients = (clients, policies) => clients.map(client => populatePoliciesOnClient(client, policies));

export const policiesWithoutClientId = policies => {
  delete policies.clientId
  return policies;
};

export const filterClientsByName = (name, clients) => {
  return clients.filter((item) => item.name.includes(name));
};