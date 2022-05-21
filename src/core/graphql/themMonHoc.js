import { gql } from '@apollo/client';
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
