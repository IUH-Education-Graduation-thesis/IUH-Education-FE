import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
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
