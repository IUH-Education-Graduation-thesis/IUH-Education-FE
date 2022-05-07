import { gql } from '@apollo/client';
export default {
  mutation: {
    suaKhoaHoc: (fragment) => gql`
        mutation ($inputs: ThemKhoaHocInputs!, $id: ID!){
            suaKhoaHoc(inputs: $inputs, id: $id){
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
