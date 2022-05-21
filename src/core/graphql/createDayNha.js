import { gql } from '@apollo/client';
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
        `,
  },
};
