import { gql } from '@apollo/client';
export default {
  mutation: {
    themPhongHoc: (fragment) => gql`
        mutation CREATE_PHONGHOC($inputs: ThemPhongHocInputs!){
            themPhongHoc(inputs:$inputs){
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
