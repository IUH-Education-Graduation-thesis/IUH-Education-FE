/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  query: {
    getLopHocPhan: (fragment) => gql`
      query ($id: ID) {
        getLopHocPhan(id: $id) {
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
