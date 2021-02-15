// @flow
import React from "react";
import type { Element } from "react";
import Flex from "@casumo/cmp-flex";
import { Link } from "@reach/router";
import { isMobile } from "Components/ResponsiveLayout";

type CardProps = {
  Icon: () => Element<*>,
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
}: CardProps) => (
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
  cards: CardProps[],
};

const SupportRow = ({ cards }: SupportRowProps) => (
  <Flex direction={isMobile() ? "vertical" : "horizontal"} justify="center">
    {cards.map(card => (
      <Flex.Item
        className="TODO-PAAANEEEL u-text-align-center TODO-PANEL"
        style={{ maxWidth: "310px" }}
      >
        <SupportCard
          Icon={card.Icon}
          linkHref="chat"
          Header={card.Header}
          Description={card.Description}
          LinkElement={card.LinkElement}
        />
      </Flex.Item>
    ))}
  </Flex>
);

export { SupportRow };
