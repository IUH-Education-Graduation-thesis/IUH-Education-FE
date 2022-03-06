import { gql } from "@apollo/client";

export default {
    query: {
        findNamHoc: (fragment) => gql`
      query FIND_NAMHOC {
        findNamHoc {
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
