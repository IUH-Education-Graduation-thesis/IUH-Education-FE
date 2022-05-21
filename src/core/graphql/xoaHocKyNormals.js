import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaHocKyNormals: (fragment) => gql`
    mutation ($ids: [ID!]) {
      xoaHocKyNormals(ids: $ids) {
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
