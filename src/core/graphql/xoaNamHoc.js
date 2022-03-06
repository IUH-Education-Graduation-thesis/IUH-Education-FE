/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        xoaNamHoc: (fragment) => gql`
        mutation DELETE_NAMHOC($id: ID!) {
            xoaNamHoc(id: $id) {
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