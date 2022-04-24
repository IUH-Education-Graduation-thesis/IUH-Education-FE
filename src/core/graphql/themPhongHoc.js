import { gql } from '@apollo/client';
// eslint-disable-next-line import/no-anonymous-default-export
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
