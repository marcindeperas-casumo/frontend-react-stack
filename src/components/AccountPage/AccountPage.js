// @flow
// This is a temporary page to be able to abtest the new valuables

import React from "react";
import {
  PlayerValuableListContainer,
  PlayerValuableListHorizontal,
} from "Components/PlayerValuableList";

export const AccountPage = () => (
  <>
    <PlayerValuableListContainer
      renderList={props => <PlayerValuableListHorizontal {...props} />}
    />
  </>
);
