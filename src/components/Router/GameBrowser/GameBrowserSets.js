// @flow
import * as React from "react";
import { Link, useMatch } from "@reach/router";
import { ChipNavigation } from "@casumo/cmp-chip";
import Flex from "@casumo/cmp-flex";
import * as Icons from "@casumo/cmp-icons";

const GameSetChip = ({
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
        <ChipNavigation isActive={active} Icon={Icon}>
          {text}
        </ChipNavigation>
      </Link>
    </Flex.Item>
  );
};

type Props = {
  sets: Array<{
    key: string,
    title: string,
    icon: string,
    url: string,
  }>,
  loading: boolean,
};
export const GameBrowserSets = (props: Props) => {
  const match = useMatch("search");
  const searchActive = Boolean(match);

  if (searchActive || props.sets.length === 0) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      spacing="default"
      className="o-wrapper u-padding--md@mobile u-padding-y--lg@desktop"
    >
      <GameSetChip to="top" Icon={Icons.HeartIcon} text="Top Lists" />
      <>
        {props.sets.map(x => (
          <GameSetChip
            key={x.key}
            to={x.url}
            Icon={Icons[x.icon]}
            text={x.title}
          />
        ))}
      </>
    </Flex>
  );
};
