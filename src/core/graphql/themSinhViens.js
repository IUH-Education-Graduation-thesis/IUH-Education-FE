import { gql } from '@apollo/client';

export default {
  mutation: {
    themSinhViens: (fragment = 'id') => gql`
      mutation ($files: [Upload!]!, $lopId: ID!) {
        themSinhViens(files: $files, lopId: $lopId) {
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
