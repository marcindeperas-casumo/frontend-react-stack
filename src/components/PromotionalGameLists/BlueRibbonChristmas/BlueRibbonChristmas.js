// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import Scrollable from "@casumo/cmp-scrollable";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import * as A from "Types/apollo";
import { JackpotsListTile } from "Components/JackpotsListTile";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useFetch } from "Utils/hooks";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

type Props = {
  id: string,
};

export function BlueRibbonChristmas({ id }: Props) {
  const { response } = useFetch(
    "/casino-player/blueribbon-jackpot-integration/api/v1/handshake"
  );
  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: { id, numberOfGames: 30 },
    }
  );

  const columns = R.splitEvery(3, R.pathOr([], ["gamesList", "games"], data));
  const available = R.propOr(false, "available", response);

  if (!available) {
    return null;
  }

  return (
    <div className="o-wrapper">
      <div className="u-padding-top--xlg">
        <ScrollableListTitleRow paddingLeft title="Blue Ribbon Campaign" />
        <Scrollable
          numberOfItems={columns.length}
          itemRenderer={i => <JackpotsListTile games={columns[i]} />}
          padding={PADDING_PER_DEVICE}
        />
      </div>
    </div>
  );
}
