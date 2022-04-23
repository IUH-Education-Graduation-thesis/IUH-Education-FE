import { gql } from "@apollo/client";

export default {
  query: {
    findSinhVien: (fragment = "") => gql`
    query FIND_SINH_VIEN($inputs: FindSinhVienInputs) {
      findSinhVien(inputs: $inputs) {
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
