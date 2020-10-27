// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { convertHTMLToString, renderBets, interpolate } from "Utils";
import ImageLazy from "Components/Image/ImageLazy";
import { GameTileHeart } from "Components/GameTileHeart";
import { LiveCasinoCardData } from "./LiveCasinoCardData";

export type Props = {
  game: A.GameTile_Game,
  liveCasinoTable?: A.LiveCasinoCardSmallDataQuery_liveCasinoTablesById,
  t: {
    playNowText: string,
    betBehindText: string,
    openSeatsText: string,
    opensAtText: string,
    tableClosedText: string,
  },
};

const cardVerticalCenter = "48.19%";

export class LiveCasinoCardSmall extends React.PureComponent<Props> {
  renderHeader = () => {
    const { liveCasinoTable, game } = this.props;

    if (!liveCasinoTable) {
      return (
        <ImageLazy
          className="o-ratio__content"
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
            {interpolate(t.opensAtText, {
              // $FlowIgnore: Checked above
              time: liveCasinoTable?.operationHours.startTime,
            })}
          </ButtonSecondary>
        )}
        <Text
          tag="span"
          size="2xs"
          className="u-font-weight-black t-color-white"
        >
          {(t.tableClosedText || "").toUpperCase()}
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
        <Flex
          className="t-color-grey-70 u-position-absolute u-right-0 u-bottom-0"
          onClick={e => e.stopPropagation()}
        >
          <GameTileHeart
            className="u-width--2xlg u-height--2xlg u-padding t-color-red-30"
            gameId={game.id}
            isInMyList={game.isInMyList}
          />
        </Flex>
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
