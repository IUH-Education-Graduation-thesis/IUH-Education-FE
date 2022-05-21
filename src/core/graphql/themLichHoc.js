import { gql } from '@apollo/client';
export default {
  mutation: {
    themLichHoc: (fragment) => gql`
        mutation ($inputs: ThemLichHocInputs!){
          themLichHoc(inputs:$inputs){
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
