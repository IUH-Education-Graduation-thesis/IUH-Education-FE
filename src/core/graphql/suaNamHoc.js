import { gql } from '@apollo/client';
export default {
  mutation: {
    suaNamHoc: (fragment) => gql`
      mutation ($inputs: ThemNamHocInputs!, $id: ID!) {
        suaNamHoc(inputs: $inputs, id: $id) {
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
