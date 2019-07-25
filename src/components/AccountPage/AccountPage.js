// @flow
// This is a temporary page to be able to view the valuables while on production
// Route is only available to those who know about it

import React from "react";
import AdventureCard from "Components/AdventureCard";
import {
  PlayerValuableListContainer,
  PlayerValuableListHorizontal,
} from "Components/PlayerValuableList";

export const AccountPage = () => (
  <>
    <AdventureCard />
    <PlayerValuableListContainer renderList={PlayerValuableListHorizontal} />
  </>
);
