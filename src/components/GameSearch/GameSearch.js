// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";

type Props = {
  isLoaded: boolean,
  fetchAllGames: Function,
  games: [],
};

export default class GameSearch extends PureComponent<Props> {
  componentDidMount() {
    const { isLoaded, fetchAllGames } = this.props;

    if (!isLoaded) fetchAllGames();
  }

  render() {
    return (
      <Flex direction="vertical" spacing="none">
        <Flex.Block className="t-background-grey-light-2">
          <Flex className="u-padding--md" align="stretch">
            <Flex.Block>
              <SearchInput
                autoFocus={true}
                placeholder="Eg. game title, provider"
              />
            </Flex.Block>
          </Flex>
        </Flex.Block>
      </Flex>
    );
  }
}
