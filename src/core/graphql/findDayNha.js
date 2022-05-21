import { gql } from '@apollo/client';

export default {
  query: {
    findDayNha: (fragment) => gql`
      query FIND_DAYNHA {
        findDayNha {
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
