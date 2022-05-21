import { gql } from '@apollo/client';
export default {
  mutation: {
    themLopHocPhan: (fragment) => gql`
        mutation ($inputs: ThemLopHocPhanInputs!){
          themLopHocPhan(inputs:$inputs){
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
