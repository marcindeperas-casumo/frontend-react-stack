// @flow
import * as React from "react";
import { Link, useMatch } from "@reach/router";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import {
  ChipCardsIcon,
  DiamondIcon,
  HeartIcon,
  MoneyStackIcon,
  MustDropJackpotIcon,
  TablegamesIcon,
} from "@casumo/cmp-icons";

const GameSetButton = ({
  Icon,
  text,
  to,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: string,
  to: string,
}) => {
  const match = useMatch(to);
  const active = Boolean(match);

  return (
    <Flex.Item>
      <Link to={to}>
        <Button
          variant={active ? "primary" : "secondary"}
          style={
            active
              ? {}
              : {
                  color: "#444e5d",
                  backgroundColor: "#fff",
                }
          }
        >
          <Icon className="u-margin-right" />
          {text}
        </Button>
      </Link>
    </Flex.Item>
  );
};

export const GameBrowserSets = () => {
  return (
    <Flex
      direction="horizontal"
      spacing="default"
      className="o-wrapper u-padding-y--lg"
    >
      <GameSetButton to="top" Icon={HeartIcon} text="Top Lists" />
      <GameSetButton to="slots" Icon={DiamondIcon} text="Slots" />
      <GameSetButton to="table" Icon={TablegamesIcon} text="Table games" />
      <GameSetButton to="jackpots" Icon={MoneyStackIcon} text="Jackpots" />
      <GameSetButton
        to="must-drop-jackpots"
        Icon={MustDropJackpotIcon}
        text="Must Drop Jackpots"
      />
      <GameSetButton to="live-casino" Icon={ChipCardsIcon} text="Live Casino" />
    </Flex>
  );
};
