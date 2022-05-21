import { gql } from '@apollo/client';
export default {
  mutation: {
    themHocKyNormal: (fragment = 'id') => gql`
      mutation ($inputs: ThemHocKyNormalInputs!) {
        themHocKyNormal(inputs: $inputs) {
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
