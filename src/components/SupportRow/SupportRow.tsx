import { useMedia } from "react-use";
import Flex from "@casumo/cmp-flex";
import React from "react";
import { Link } from "@reach/router";
import { getMediaQuery, mobileBreakpoint } from "Components/ResponsiveLayout";
import { Panel } from "Components/Panel";

type TCardProps = {
  Icon: React.ComponentType<{}>;
  Header: React.ComponentType<{}>;
  Description: React.ComponentType<{}>;
  linkHref: string;
  LinkElement: React.ComponentType<{}>;
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
  cards: Array<TCardProps>;
};

const SupportRow = ({ cards }: SupportRowProps) => {
  const isMobile = useMedia(getMediaQuery(mobileBreakpoint));

  return (
    <Flex direction={isMobile ? "vertical" : "horizontal"} justify="center">
      {cards.map((card, i) => (
        <Flex.Item key={i}>
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
