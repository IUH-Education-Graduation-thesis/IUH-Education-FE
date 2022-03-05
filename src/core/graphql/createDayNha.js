import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mutation: {
        themDayNha: (fragment) => gql`
        mutation CREATE_DAYNHA($inputs: ThemDayNhaInput!){
            themDayNha(inputs:$inputs){
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