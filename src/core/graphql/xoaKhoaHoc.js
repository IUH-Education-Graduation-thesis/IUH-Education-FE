import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaKhoaHocs: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaKhoaHocs(ids: $ids) {
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
