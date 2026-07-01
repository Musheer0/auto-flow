export const workflowKey = (id: string) => `workflow:${id}`;
export const workflowDataKey = (id: string) => `workflow:${id}:data`;

export const workflowsByOrgKey = (orgId: string) => `workflows:org:${orgId}:v2`;

export const credentialKey = (id: string) => `credential:${id}`;

export const credentialsByOrgKey = (orgId: string) =>
  `credentials:org:${orgId}`;
