/* eslint-disable import/no-anonymous-default-export */
import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaKhoaHoc: (fragment) => gql`
        mutation DELETE_KHOAHOC($id: ID!) {
            xoaKhoaHoc(id: $id) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                  ${fragment}
                }
              }
        }
        `,
  },
};
