import { gql } from "@apollo/client";

export default {
  query: {
    getSinhViens: (fragment) => gql`
      query GET_SINHVIENS {
        getSinhViens {
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
