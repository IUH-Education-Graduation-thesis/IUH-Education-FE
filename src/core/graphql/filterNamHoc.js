import { gql } from '@apollo/client';

export default {
  query: {
    filterNamHoc: (fragment) => gql`
      query ($inputs: FilterNamHocInputs) {
        filterNamHoc(inputs: $inputs) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            count
            result {
              ${fragment}
            }
          }
        }
      }
    `,
  },
};
