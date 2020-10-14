import React from "react";
import Flex from "@casumo/cmp-flex";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import {
  PlayOkayBar,
  ProfileIconWithDrawer,
} from "Components/Compliance/PlayOkayBar";
import { QuickDeposit } from "Components/QuickDeposit";
import { InGameDrawerLinks } from "Components/InGameDrawer/InGameDrawerLinks";

import "./GamePageHeader.scss";

export const GamePageHeader = ({ pauseGame, resumeGame }) => {
  return (
    <Flex
      align="center"
      spacing="none"
      className="c-game-page-header u-padding--md@desktop"
    >
      <Flex.Item>
        <ProfileIconWithDrawer />
      </Flex.Item>
      <Flex.Block>
        <Flex
          className="t-background-grey-90 t-border-r@desktop u-padding-y@desktop u-padding-left--lg"
          align="center"
          justify="space-between"
          spacing="none"
        >
          <MobileAndTablet>
            <Flex.Item className="c-gamepage-header-sumoticon-spacer"></Flex.Item>
          </MobileAndTablet>
          <Flex.Item>
            <PlayOkayBar />
          </Flex.Item>
          <Desktop>
            <Flex.Item>
              <QuickDeposit />
            </Flex.Item>
            <Flex.Item>
              <InGameDrawerLinks showLabels={false} />
            </Flex.Item>
          </Desktop>
        </Flex>
      </Flex.Block>
    </Flex>
  );
};
