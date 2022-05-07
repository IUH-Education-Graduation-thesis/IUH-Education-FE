import { gql } from '@apollo/client';
export default {
  mutation: {
    themKhoaHoc: (fragment) => gql`
        mutation ($inputs: ThemKhoaHocInputs!){
            themKhoaHoc(inputs:$inputs){
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
