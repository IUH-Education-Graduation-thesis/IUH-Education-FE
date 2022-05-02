/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  query: {
    findKhoaHocs: (fragment) => gql`
    query ($inputs: FindKhoaHocInputs ) {
      findKhoaHocs (inputs: $inputs) {
        status
        errors {
          message
          error_fields
        }
        message
        data {
          count
          data {
            ${fragment}
          }
        }
      }
    }
    `,
  },
};
