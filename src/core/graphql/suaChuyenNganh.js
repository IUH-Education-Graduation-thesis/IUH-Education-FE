import { gql } from '@apollo/client';
export default {
  mutation: {
    suaChuyenNganh: (fragment) => gql`
        mutation ($inputs: ThemChuyenNganhInputs!, $id: ID!){
            suaChuyenNganh(inputs:$inputs, id: $id){
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
