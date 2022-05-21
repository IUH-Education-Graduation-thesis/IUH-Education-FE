import { gql } from '@apollo/client';
export default {
  mutation: {
    themGiangVien: (fragment) => gql`
        mutation ($inputs: ThemGiaoVienInputs!){
            themGiangVien(inputs:$inputs){
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
