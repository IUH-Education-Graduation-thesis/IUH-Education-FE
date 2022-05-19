import { gql } from '@apollo/client';

export default {
  mutation: {
    themSinhViens: (fragment = 'id') => gql`
      mutation ($files: [Upload!]!) {
        themSinhViens(files: $files) {
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
