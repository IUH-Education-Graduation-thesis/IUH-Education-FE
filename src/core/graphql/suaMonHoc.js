import { gql } from '@apollo/client';
export default {
  mutation: {
    suaMonHoc: (fragment) => gql`
        mutation ($inputs: ThemMonHocInputs!, $id: ID!){
            suaMonHoc(inputs: $inputs, id: $id){
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
