import { gql } from '@apollo/client';
export default {
  mutation: {
    suaHocPhan: (fragment) => gql`
        mutation ($inputs: ThemHocPhanInputs!, $id: ID!){
          suaHocPhan(inputs: $inputs, id: $id){
               status
               message
               errors{
                 message
                 error_fields
               }
               data{
                   ${fragment}
               }
             }
        }
        `,
  },
};
