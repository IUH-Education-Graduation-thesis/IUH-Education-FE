import { gql } from '@apollo/client';
export default {
  mutation: {
    themHocKy: (fragment) => gql`
        mutation ($inputs: ThemHocKyInputs!){
            themHocKy(inputs:$inputs){
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
