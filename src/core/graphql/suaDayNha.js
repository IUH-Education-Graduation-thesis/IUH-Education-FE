import { gql } from '@apollo/client';
// eslint-disable-next-line import/no-anonymous-default-export
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
