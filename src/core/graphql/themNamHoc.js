import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mutation: {
        themNamHoc: (fragment) => gql`
        mutation CREATE_NAMHOC($inputs: ThemNamHocInputs!){
            themNamHoc(inputs:$inputs){
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
        `
    }
}