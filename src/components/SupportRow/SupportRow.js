// @flow
import React from "react";
import type { Element } from "react";
import { useMedia } from "react-use";
import Flex from "@casumo/cmp-flex";
import { Link } from "@reach/router";
import { getMediaQuery, mobileBreakpoint } from "Components/ResponsiveLayout";
import { Panel } from "Components/Panel";

type TCardProps = {
  Icon: () => Element<any>,
  Header: () => Element<any>,
  Description: () => Element<any>,
  linkHref: string,
  LinkElement: () => Element<any>,
};

const SupportCard = ({
  Icon,
  Header,
  Description,
  linkHref,
  LinkElement,
}: TCardProps) => (
  <>
    <Icon />
    <Header />
    <Description />
    <Link to={linkHref}>
      <LinkElement />
    </Link>
  </>
);

export type SupportRowProps = {
  cards: Array<TCardProps>,
};

const SupportRow = ({ cards }: SupportRowProps) => {
  const isMobile = useMedia(getMediaQuery(mobileBreakpoint));

  return (
    <Flex direction={isMobile ? "vertical" : "horizontal"} justify="center">
      {cards.map(card => (
        <Flex.Item>
          <Panel className="u-text-align-center">
            <SupportCard
              Icon={card.Icon}
              linkHref="chat"
              Header={card.Header}
              Description={card.Description}
              LinkElement={card.LinkElement}
            />
          </Panel>
        </Flex.Item>
      ))}
    </Flex>
  );
};

export { SupportRow };
