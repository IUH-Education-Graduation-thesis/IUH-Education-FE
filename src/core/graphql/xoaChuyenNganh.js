import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaChuyenNganhs: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaChuyenNganhs(ids: $ids) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                  ${fragment}
                }
              }
        }
        `,
  },
};
