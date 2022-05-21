import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaNamHocs: (fragment) => gql`
      mutation ($ids: [ID!]) {
        xoaNamHocs(ids: $ids) {
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
