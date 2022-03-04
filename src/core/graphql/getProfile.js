import { gql } from "@apollo/client";

export default {
  query: {
    getProfile: (fragment) => gql`
    query GET_PROFILE {
      getProfile {
        status
        message
        errors {
          message
          error_fields
        }
        data {
          ${fragment}
        }
      }
    }
  `,
  },
};
