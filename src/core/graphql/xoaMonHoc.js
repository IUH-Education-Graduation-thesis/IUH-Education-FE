/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  mutation: {
    xoaMonHocs: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaMonHocs(ids: $ids) {
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
