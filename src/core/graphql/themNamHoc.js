import { gql } from '@apollo/client';
export default {
  mutation: {
    themNamHoc: (fragment) => gql`
      mutation ($inputs: ThemNamHocInputs!) {
        themNamHoc(inputs: $inputs) {
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
