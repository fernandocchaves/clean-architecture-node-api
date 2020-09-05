export const AccountSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  required: ['accessToken', 'name', 'email'],
};
