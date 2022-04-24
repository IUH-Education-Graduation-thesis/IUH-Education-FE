/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  mutation: {
    xoaKhoaViens: (fragment) => gql`
        mutation ($ids: [ID!]) {
          xoaKhoaViens(ids: $ids) {
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
