import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
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
