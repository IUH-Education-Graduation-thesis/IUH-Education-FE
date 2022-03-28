import { gql } from "@apollo/client";

export default {
  query: {
    findKhoaVien: (fragment) => gql`
      query ($inputs: FindKhoaVienInputs) {
        findKhoaVien(inputs: $inputs) {
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
