import { gql } from '@apollo/client';

export default {
  query: {
    findNamHoc: (fragment) => gql`
      query ($inputs: FindNamHocInputs) {
        findNamHoc(inputs: $inputs) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            count
            data {
              ${fragment}
            }
          }
        }
      }
    `,
  },
};
