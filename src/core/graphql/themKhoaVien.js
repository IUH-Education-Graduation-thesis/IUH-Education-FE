import { gql } from '@apollo/client';
export default {
  mutation: {
    themKhoaVien: (fragment) => gql`
        mutation ($inputs: ThemKhoaVienInputs!){
            themKhoaVien(inputs:$inputs){
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
