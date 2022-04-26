/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  mutation: {
    xoaGiangViens: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaGiangViens(ids: $ids) {
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
