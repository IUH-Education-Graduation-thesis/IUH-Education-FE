import { gql } from "@apollo/client";

export default {
  query: {
    findHocPhan: (fragment) => gql`
      query ($inputs: FindHocPhanInputs) {
        findHocPhans(inputs: $inputs) {
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
