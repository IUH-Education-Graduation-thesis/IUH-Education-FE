import { gql } from "@apollo/client";

export default {
  mutation: {
    login: (fragment) => gql`
    mutation LOGIN($user_name: String!, $password: String!) {
        login(user_name: $user_name, password: $password) {
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
