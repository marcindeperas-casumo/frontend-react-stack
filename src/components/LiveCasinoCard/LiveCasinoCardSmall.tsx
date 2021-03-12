import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import * as React from "react";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { convertHTMLToString, renderBets, interpolate } from "Utils";
import ImageLazy from "Components/Image/ImageLazy";
import { GameTileHeart } from "Components/GameTileHeart";
import { LiveCasinoCardData } from "./LiveCasinoCardData";

export type Props = {
  game: A.GameTile_GameFragment;
  liveCasinoTable?: A.LiveCasinoCardSmallDataQuery["liveCasinoTablesById"];
  t?: {
    bet_behind: string;
    open_seats: string;
    play_now: string;
    opens_at: string;
    table_closed: string;
  };
};

const cardVerticalCenter = "48.19%";

export class LiveCasinoCardSmall extends React.PureComponent<Props> {
  renderHeader = () => {
    const { liveCasinoTable, game } = this.props;

    if (!liveCasinoTable) {
      return (
        <ImageLazy
          className="o-ratio__content"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; style: { height: string... Remove this comment to see the full error message
          style={{ height: cardVerticalCenter }}
          src={game.playBackground}
          alt={game.name}
          imgixOpts={{
            w: 160,
            h: 93,
          }}
        />
      );
    }

    return (
      <img
        className="o-ratio__content u-object-fit-contain"
        src={liveCasinoTable.image}
        alt={game.name}
        style={{ height: cardVerticalCenter }}
      />
    );
  };

  renderContent = () => {
    const { liveCasinoTable, t } = this.props;
    // TODO: liveCasinoTable.isOpen?
    if (liveCasinoTable && liveCasinoTable.state === "OPEN") {
      return (
        <Flex
          direction="vertical"
          align="end"
          justify="space-between"
          className="o-ratio__content"
          style={{
            height: cardVerticalCenter,
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
          }}
        >
          <div />
          <LiveCasinoCardData liveCasinoLobby={liveCasinoTable} t={t} small />
        </Flex>
      );
    }

    return (
      <Flex
        direction="vertical"
        align="center"
        justify="end"
        className="o-ratio__content u-padding--md"
        style={{
          height: cardVerticalCenter,
          background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
        }}
      >
        <div />
        {liveCasinoTable?.operationHours.startTime && (
          <ButtonSecondary size="xs" className="u-margin">
            {interpolate(t?.opens_at, {
              time: liveCasinoTable?.operationHours.startTime,
            })}
          </ButtonSecondary>
        )}
        <Text
          tag="span"
          size="2xs"
          className="u-font-weight-black t-color-white"
        >
          {(t?.table_closed || "").toUpperCase()}
        </Text>
      </Flex>
    );
  };

  renderFooter = () => {
    const { liveCasinoTable, game } = this.props;

    return (
      <Flex
        direction="vertical"
        className="o-ratio__content"
        style={{
          top: cardVerticalCenter,
          height: `calc(100% - ${cardVerticalCenter})`,
        }}
      >
        <Flex
          direction="vertical"
          className="u-position-absolute u-padding--md"
        >
          <Text
            tag="h3"
            size="sm"
            className="u-font-weight-black u-margin-bottom--sm u-text-clamp t-color-grey-90"
          >
            {convertHTMLToString(game.name)}
          </Text>
          {liveCasinoTable && (
            <Text tag="span">{renderBets(liveCasinoTable.bets)}</Text>
          )}
        </Flex>
        <GameTileHeart
          containerClassName="t-color-grey-70 u-position-absolute u-right-0 u-bottom-0"
          heartClassName="u-width--2xlg u-height--2xlg u-padding t-color-red-30"
          gameId={game.id}
          gameName={game.name}
        />
      </Flex>
    );
  };

  render() {
    const { slug } = this.props.game;

    return (
      <div className="u-padding-bottom--sm">
        <Card
          className="o-ratio t-border-r--md u-overflow--hidden t-background-white t-elevation--10"
          spacing="md"
          onClick={() => launchGame({ slug })}
          header={this.renderHeader}
          content={this.renderContent}
          footer={this.renderFooter}
        />
      </div>
    );
  }
}
