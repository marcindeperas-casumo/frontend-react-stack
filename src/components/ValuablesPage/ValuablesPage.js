// @flow
// This is a temporary page to be able to view the valuables while on production
// Route is only available to those who know about it

import React from "react";
import {
  PlayerValuableListContainer,
  PlayerValuableListVertical,
} from "Components/PlayerValuableList";

export const ValuablesPage = () => (
  <>
    <PlayerValuableListContainer
      renderList={props => <PlayerValuableListVertical {...props} />}
    />
  </>
);
