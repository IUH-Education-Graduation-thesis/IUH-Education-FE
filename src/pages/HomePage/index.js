import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { useQuery } from "@apollo/client";

import { clientCache } from "helpers";
import queries from "core/graphql";
import { GET_PROFILE_FRAGMENT } from "./fragment";
import HomeModule from "modules/HomePage";

const getProfileQuery = queries?.query?.getProfile(GET_PROFILE_FRAGMENT);

const HomePage = () => {
  // const { error } = useQuery(getProfileQuery, {
  //   fetchPolicy: "network-only",
  // });

  // /**
  //  * detect token --> redirect to login page
  //  */
  // useEffect(() => {
  //   if (isEmpty(clientCache.getAuthenTokenWithCookie())) {
  //     window.location.href = `${window?.location?.origin}/login`;
  //     return;
  //   }

  //   if (!isEmpty(error)) {
  //     clientCache.removeAuthenTokenWithCookie();
  //     window.location.href = `${window?.location?.origin}/login`;
  //   }
  // }, [error]);

  return <HomeModule />;
};

export default HomePage;
