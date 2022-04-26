/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  query: {
    findChuyenNganh: (fragment) => gql`
      query ($inputs: FindChuyenNganhInputs) {
        findChuyenNganh(inputs: $inputs) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            ${fragment}
          }
        }
      }
    `,
  },
};
