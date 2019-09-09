// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import { GameRow } from "Components/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

type Props = {
  ids: Array<string>,
  areGamesLoaded: boolean,
  initFetchTopLists: () => void,
};
export default class MustDropJackpotList extends PureComponent<Props> {
  componentDidMount() {
    const { areGamesLoaded, initFetchTopLists } = this.props;
    if (!areGamesLoaded) {
      initFetchTopLists();
    }
  }

  render() {
    const { ids, areGamesLoaded } = this.props;

    return !areGamesLoaded ? (
      <div className="t-background-chrome-light-2 u-padding--md">
        <GameListSkeleton hasTitle={false} />
      </div>
    ) : (
      <div className="t-background-chrome-light-2 u-padding-x--md u-padding-top--md u-padding-bottom--md o-list-wrapper">
        {ids.map(id => (
          <div className="u-margin-bottom">
            <GameRow id={id} />
          </div>
        ))}
      </div>
    );
  }
}
