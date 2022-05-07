import { gql } from '@apollo/client';
export default {
  mutation: {
    suaDayNha: (fragment) => gql`
        mutation SUA_DAYNHA($inputs: SuaDayNhaInput!){
            suaDayNha(inputs:$inputs){
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
