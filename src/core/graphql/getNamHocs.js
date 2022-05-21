import { gql } from '@apollo/client';

export default {
  query: {
    getNamHocs: (fragment) => gql`
      query {
        getNamHocs {
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
