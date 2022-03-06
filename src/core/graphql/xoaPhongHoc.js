/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        xoaPhongHoc: (fragment) => gql`
        mutation DELETE_PHONGHOC($phongHocId: ID!) {
            xoaPhongHoc(phongHocId: $phongHocId) {
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
        `
    }
}