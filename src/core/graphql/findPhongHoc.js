import { gql } from "@apollo/client";

export default {
    query: {
        findPhongHocs: (fragment) => gql`
      query FIND_PHONGHOC {
        findPhongHocs {
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
