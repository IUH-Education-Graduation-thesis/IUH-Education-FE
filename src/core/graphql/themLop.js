import { gql } from '@apollo/client';
export default {
  mutation: {
    themLop: (fragment) => gql`
        mutation ($inputs: ThemLopInputs!){
          themLop(inputs:$inputs){
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
