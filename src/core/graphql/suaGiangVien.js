/* eslint-disable import/no-anonymous-default-export */
import { gql } from '@apollo/client';
export default {
  mutation: {
    suaGiangVien: (fragment) => gql`
        mutation ($inputs: ThemGiaoVienInputs!, $id: ID!){
            suaGiangVien(inputs: $inputs, id: $id){
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
