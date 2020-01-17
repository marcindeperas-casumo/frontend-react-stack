// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { MustDropJackpotsWidget } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import { MustDropJackpotsWidgetSkeleton } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidgetSkeleton";

const QUERY = gql`
  query mustDropJackpotsQuery {
    mustDropJackpots {
      label
      image
      id
      amount {
        formattedAmount
      }
    }
  }
`;

const MustDropJackpotsWidgetContainer = () => {
  const { data, loading } = useQuery<A.mustDropJackpotsQuery, null>(QUERY);
  if (loading) {
    return <MustDropJackpotsWidgetSkeleton />;
  }

  return (
    <MustDropJackpotsWidget
      loading={loading}
      jackpots={data.mustDropJackpots}
    />
  );
};

export default MustDropJackpotsWidgetContainer;
