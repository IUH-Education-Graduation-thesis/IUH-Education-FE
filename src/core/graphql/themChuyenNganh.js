import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
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
