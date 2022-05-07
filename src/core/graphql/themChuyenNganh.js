import { gql } from '@apollo/client';
export default {
  mutation: {
    themChuyenNganh: (fragment) => gql`
        mutation ($inputs: ThemChuyenNganhInputs!){
          themChuyenNganh(inputs: $inputs){
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
