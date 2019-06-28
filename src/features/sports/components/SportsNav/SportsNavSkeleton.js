/* @flow */

import * as React from "react";
import { SportsMainNavSkeleton } from "Features/sports/components/SportsNav/SportsMainNav/SportsMainNavSkeleton";
import { SportsSubNavSkeleton } from "Features/sports/components/SportsNav/SportsSubNav/SportsSubNavSkeleton";

export const SportsNavSkeleton = () => (
  <>
    <SportsMainNavSkeleton />
    <SportsSubNavSkeleton />
  </>
);
