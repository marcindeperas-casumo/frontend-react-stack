// @flow
import * as React from "react";
import { Link, useMatch } from "@reach/router";
import { ChipNavigation } from "@casumo/cmp-chip";
import Flex from "@casumo/cmp-flex";
import * as Icons from "@casumo/cmp-icons";
import { useTranslations } from "Utils/hooks";
import TrackClick from "Components/TrackClick";
import { EVENTS } from "Src/constants";

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
};
export const GameBrowserSets = (props: Props) => {
  const searchActive = Boolean(useMatch("search"));
  const detailsActive = Boolean(useMatch("details/:slug"));
  const t = useTranslations<{
    top_lists: string,
  }>("new-game-browser.top-nav");

  if (searchActive || detailsActive || props.sets.length === 0) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      spacing="default"
      className="o-wrapper u-padding--md@tablet u-padding-y--lg@desktop u-overflow--scroll"
    >
      <GameSetChip
        to="top"
        Icon={Icons.TopListsIcon}
        text={t?.top_lists || ""}
      />
      <>
        {props.sets.map(x => (
          <TrackClick
            key={x.key}
            eventName={EVENTS.MIXPANEL_GAME_SET_CLICKED}
            data={{ gameSet: x.key }}
          >
            <GameSetChip to={x.url} Icon={Icons[x.icon]} text={x.title} />
          </TrackClick>
        ))}
      </>
    </Flex>
  );
};
