// @flow

import React from "react";
import {
  PlayerValuableListContainer,
  PlayerValuableListVertical,
} from "Components/PlayerValuableList";

export const ValuablesPage = () => (
  <PlayerValuableListContainer
    renderList={props => <PlayerValuableListVertical {...props} />}
  />
);
