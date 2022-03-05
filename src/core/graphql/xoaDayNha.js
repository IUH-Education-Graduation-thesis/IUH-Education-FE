/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        xoaDayNha: (fragment) => gql`
        mutation DELETE_DAYNHA($id: ID!) {
            xoaDayNha(id: $id) {
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