import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaHocPhans: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaHocPhans(ids: $ids) {
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
