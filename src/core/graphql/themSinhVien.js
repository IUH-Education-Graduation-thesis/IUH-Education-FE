/* eslint-disable import/no-anonymous-default-export */
import { gql } from '@apollo/client';

export default {
  mutation: {
    themSinhVien: (fragment = 'id') => gql`
      mutation ($inputs: SinhVienInputs!) {
        themSinhVien(inputs: $inputs) {
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
