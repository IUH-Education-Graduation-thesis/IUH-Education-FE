import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaSinhVienOfLopHocPhan: (fragment) => gql`
      mutation ($sinhVienIds: [ID!], $lopHocPhanId: ID!) {
        xoaSinhVienOfLopHocPhan(sinhVienIds: $sinhVienIds, lopHocPhanId: $lopHocPhanId) {
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
