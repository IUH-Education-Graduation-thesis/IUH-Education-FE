import { gql } from '@apollo/client';
export default {
  mutation: {
    suaLop: (fragment) => gql`
        mutation ($inputs: ThemLopInputs!, $id: ID!){
            suaLop(inputs: $inputs, id: $id){
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
