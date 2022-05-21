import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaGiangViensOfMonHoc: (fragment) => gql`
      mutation ($giangVienIds: [ID!], $monHocId: ID!) {
        xoaGiangViensOfMonHoc(giangVienIds: $giangVienIds, monHocId: $monHocId) {
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
