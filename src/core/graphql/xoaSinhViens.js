/* eslint-disable import/no-anonymous-default-export */
import { gql } from '@apollo/client';

export default {
  mutation: {
    xoaSinhViens: (fragment) => gql`
        mutation ($ids: [ID!]) {
            xoaSinhViens(ids: $ids) {
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
