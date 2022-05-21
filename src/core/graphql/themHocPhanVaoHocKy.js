import { gql } from '@apollo/client';
export default {
  mutation: {
    themHocPhanVaoHocKy: (fragment) => gql`
        mutation ($hocPhanIds: [ID!], $hocKyId: ID!){
          themHocPhanVaoHocKy(hocPhanIds: $hocPhanIds, hocKyId: $hocKyId){
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
