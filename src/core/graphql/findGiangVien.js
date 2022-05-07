import { gql } from '@apollo/client';

export default {
  query: {
    findGiangVien: (fragment) => gql`
      query ($inputs: FindGiangVienInputs) {
        findGiangVien(inputs: $inputs) {
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
