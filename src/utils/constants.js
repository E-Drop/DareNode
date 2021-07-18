export const constants = {
  SPECIFIC_URIS: {
    LOGIN: `login`,
    CLIENTS: `clients`,
    POLICIES: `policies`,
  },
  RESPONSES: {
    UNAUTHORIZED: {
      CODE: 401,
      MESSAGE: `Unauthorized. You need to be logged in the application to execute this operation.`,
    },
    BAD_REQUEST: {
      CODE: 400,
      MESSAGE: ' Bad request. The request could not be understood by the server due to malformed syntax.'
    },
    NOT_FOUND: {
      CODE: 404,
      MESSAGE: `Not found. The resource you're trying to reach has not been found.`
    },
    SERVER_ERROR: {
      CODE: 500,
      MESSAGE: 'Server error. Something went wrong try it again later.'
    },
    FORBIDDEN: {
      code: 403,
      MESSAGE: `Permission denied. could not perform this operation`
    },
    NOT_MODIFIED: {
      code :304,
    }
  }
};