export const policyWithoutClientId = policy => {
  delete policy.clientId
  return policy;
};

export const policiesWithoutClientId = policies => policies.map(policyWithoutClientId);