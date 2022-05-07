import { gql } from '@apollo/client';
export default {
  mutation: {
    suaKhoaVien: (fragment) => gql`
        mutation ($inputs: ThemKhoaVienInputs!, $id: ID!){
            suaKhoaVien(inputs: $inputs, id: $id){
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
