import React from "react";
import Flex from "@casumo/cmp-flex";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import {
  PlayOkayBar,
  ProfileIconWithDrawer,
} from "Components/Compliance/PlayOkayBar";
import { QuickDeposit } from "Components/QuickDeposit";
import { InGameDrawerLinks } from "Components/InGameDrawer";

import "./GamePageHeader.scss";

export const GamePageHeader = ({ pauseGame, resumeGame }) => {
  return (
    <Flex align="center" spacing="none" className="u-padding--md@desktop">
      <Flex.Item className="c-game-page-header__sumoticon-container">
        <ProfileIconWithDrawer />
      </Flex.Item>
      <Flex.Block>
        <Flex
          className="u-position-relative u-zindex--content-overlay t-background-grey-90 t-border-r@desktop u-padding-y@desktop u-padding-left--lg"
          align="center"
          spacing="none"
        >
          <MobileAndTablet>
            <Flex.Item className="c-gamepage-header-sumoticon-spacer"></Flex.Item>
          </MobileAndTablet>
          <Flex.Block className="o-flex-justify--start@desktop">
            <PlayOkayBar />
          </Flex.Block>
          <Desktop>
            <Flex.Item className="u-margin-right--5xlg u-padding-right--5xlg">
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
