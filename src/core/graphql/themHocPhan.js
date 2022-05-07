import { gql } from '@apollo/client';
export default {
  mutation: {
    themHocPhan: (fragment) => gql`
        mutation ($inputs: ThemHocPhanInputs!){
            themHocPhan(inputs:$inputs){
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
