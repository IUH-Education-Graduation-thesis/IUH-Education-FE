import { gql } from '@apollo/client';
export default {
  mutation: {
    suaLichHoc: (fragment = 'id') => gql`
          mutation ($inputs: ThemLichHocInputs!, $id: ID!) {
            suaLichHoc(inputs: $inputs, id: $id) {
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
