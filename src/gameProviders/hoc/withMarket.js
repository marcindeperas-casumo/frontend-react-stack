// @flow
import React from "react";
import { useUrlPrefix } from "Utils/hooks";

export const withMarket = (Component: any) => {
  return (props: any) => {
    const market = useUrlPrefix();

    return <Component market={market} {...props} />;
  };
};
