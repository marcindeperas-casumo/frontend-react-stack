// @flow
import * as React from "react";
import { Link, useMatch } from "@reach/router";
import Button from "@casumo/cmp-button";
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
      className="o-wrapper u-padding-y--lg"
    >
      <GameSetButton to="top" Icon={Icons.HeartIcon} text="Top Lists" />
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
