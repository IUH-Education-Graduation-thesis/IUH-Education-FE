import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mutation: {
    themMonHoc: (fragment) => gql`
        mutation ($inputs: ThemMonHocInputs!){
          themMonHoc(inputs:$inputs){
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
