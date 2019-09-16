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
      <GameListSkeleton className="u-padding--md" hasTitle={false} />
    ) : (
      <div className="u-padding-x--md u-padding-bottom--md o-list-wrapper">
        <List
          items={ids}
          data-test="must-drop-jackpots-list"
          render={id => <GameRow id={id} />}
        />
      </div>
    );
  }
}
