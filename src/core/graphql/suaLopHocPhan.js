import { gql } from '@apollo/client';
export default {
  mutation: {
    suaLopHocPhan: (fragment) => gql`
        mutation ($inputs: ThemLopHocPhanInputs!, $id: ID!){
          suaLopHocPhan(inputs: $inputs, id: $id){
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
