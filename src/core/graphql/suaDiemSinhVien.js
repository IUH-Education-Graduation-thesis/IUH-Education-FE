import { gql } from '@apollo/client';
export default {
  mutation: {
    suaDiemSinhVien: (fragment) => gql`
        mutation ($inputs: SuaSinhVienLopHocPhanInputs!){
          suaDiemSinhVien(inputs: $inputs){
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
