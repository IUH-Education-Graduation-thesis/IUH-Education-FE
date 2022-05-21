import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaLops: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaLops(ids: $ids) {
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
