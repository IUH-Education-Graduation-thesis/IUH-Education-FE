import { gql } from '@apollo/client';
export default {
  mutation: {
    suaSinhVien: (fragment) => gql`
        mutation ($inputs: SinhVienInputs!, $sinhVienId: ID!){
            suaSinhVien(inputs: $inputs, sinhVienId: $sinhVienId){
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
