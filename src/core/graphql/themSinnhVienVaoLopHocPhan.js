import { gql } from '@apollo/client';

export default {
  mutation: {
    themSinhVienVaoLopHocPhan: (fragment = 'id') => gql`
      mutation ($hocPhanId: ID!, $sinhVienIds: [ID!], $nhomThuHanh: Int){
        themSinhVienVaoLopHocPhan(hocPhanId: $hocPhanId, sinhVienIds: $sinhVienIds, nhomThuHanh: $nhomThuHanh) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            ${fragment}
          }
        }
      }
    `,
  },
};
