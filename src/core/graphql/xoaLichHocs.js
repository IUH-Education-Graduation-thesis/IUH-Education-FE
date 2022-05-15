import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaLichHocs: (fragment) => gql`
        mutation ($ids: [ID!]) {
          xoaLichHocs(ids: $ids) {
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
