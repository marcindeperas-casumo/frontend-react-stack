// @flow
import React from "react";
import AdventureCard from "Components/AdventureCard";
import {
  PlayerValuableList,
  PlayerValuableListHorizontal,
} from "Components/PlayerValuableList";

export const AccountPage = () => (
  <>
    <AdventureCard />
    <PlayerValuableList>
      {props => <PlayerValuableListHorizontal {...props} />}
    </PlayerValuableList>
  </>
);
