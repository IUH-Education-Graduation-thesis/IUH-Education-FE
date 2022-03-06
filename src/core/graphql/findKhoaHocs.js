import { gql } from "@apollo/client";

export default {
    query: {
        findKhoaHocs: (fragment) => gql`
      query FIND_KHOAHOC {
        findKhoaHocs {
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
