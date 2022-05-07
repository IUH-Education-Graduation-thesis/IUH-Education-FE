import { gql } from '@apollo/client';
export default {
  mutation: {
    suaHocKy: (fragment) => gql`
        mutation ($inputs: ThemHocKyInputs!, $id: ID!){
            suaHocKy(inputs: $inputs, id: $id){
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
