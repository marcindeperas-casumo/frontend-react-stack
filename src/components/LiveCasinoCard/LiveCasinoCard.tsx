import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import { ButtonSecondary, ButtonPrimary } from "@casumo/cmp-button";
import cx from "classnames";
import React, { PureComponent } from "react";
import { prop } from "ramda";
import { launchGame } from "Services/LaunchGameService";
import { convertHTMLToString, interpolate, renderBets } from "Utils";
import { EVENTS, EVENT_PROPS, LIVE_CASINO_STATES } from "Src/constants";
import ImageLazy from "Components/Image/ImageLazy";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import { LiveCasinoCardFooter } from "Components/LiveCasinoCard/LiveCasinoCardFooter";
import { LiveCasinoCardData } from "Components/LiveCasinoCard/LiveCasinoCardData";
import * as A from "Types/apollo";
import type { TLiveCasinoCardContent } from "./LiveCasinoCardContainer";
import "./LiveCasinoCard.scss";

export type Props = {
  game: A.GameListLiveCasinoQuery["gamesList"]["games"][number];
  t?: TLiveCasinoCardContent;
};

export class LiveCasinoCard extends PureComponent<Props> {
  get liveCasinoTableId() {
    return prop("tableId", this.liveCasinoLobby);
  }

  get liveCasinoLobby() {
    return prop("liveCasinoLobby", this.props.game);
  }

  renderHeader = () => {
    const { isInMaintenance } = this.props.game;
    return (
      <div
        className="o-ratio o-ratio--live-casino-card"
        onClick={this.onLaunchGame}
      >
        <ImageLazy
          className="o-ratio__content"
          src={this.liveCasinoLobby.image}
        />
        <Flex
          direction="vertical"
          align="end"
          justify="space-between"
          className="o-ratio__content u-font-weight-bold"
        >
          <GameTileHeart
            containerClassName="text-white"
            heartClassName="u-width--4xlg u-height--4xlg u-padding--md"
            gameId={this.props.game.id}
            gameName={this.props.game.name}
          />
          <LiveCasinoCardData
            liveCasinoLobby={this.liveCasinoLobby}
            t={this.props.t}
          />
        </Flex>
        {this.liveCasinoLobby?.state === LIVE_CASINO_STATES.CLOSED &&
          this.liveCasinoLobby?.operationHours &&
          this.liveCasinoLobby?.operationHours.startTime && (
            <div className="c-live-casino-card-maintenance__notification left-1/4 u-font-sm u-text-align-center o-position--absolute u-width--2/4 t-border-r o-inset-bottom--none u-margin-bottom--lg u-height--2xlg text-black u-font-weight-bold t-opacity--75 bg-white">
              <span>
                {interpolate(this.props.t?.opens_at, {
                  time: this.liveCasinoLobby.operationHours.startTime,
                })}
              </span>
            </div>
          )}
        {isInMaintenance && (
          <div className="c-live-casino-card-maintenance__notification u-font-sm u-text-align-center o-position--absolute u-width--full o-inset-bottom--none u-height--2xlg text-white u-font-weight-bold t-opacity--75 bg-black">
            <span>{this.props.t?.table_temporarily_unavailable}</span>
          </div>
        )}
      </div>
    );
  };

  onLaunchGame = () => launchGame({ slug: this.props.game.slug });

  renderContent = () => {
    const { game } = this.props;
    const { isInMaintenance } = game;

    return (
      <Flex onClick={this.onLaunchGame} className="u-padding-x--md">
        <Flex.Block>
          <Text
            tag="h3"
            className="u-font-weight-black u-margin-bottom--sm u-text-clamp text-grey-70"
          >
            {convertHTMLToString(game.name)}
          </Text>
          {this.liveCasinoLobby && (
            <Text tag="span">{renderBets(this.liveCasinoLobby.bets)}</Text>
          )}
        </Flex.Block>
        <Flex.Item>
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: game.name }}
          >
            {isInMaintenance ? (
              <ButtonSecondary
                size="sm"
                className="u-text-transform-capitalize c-live-casino-card-maintenance__play-button text-white"
              >
                <PlayIcon size="sm" className="u-margin-right--sm" />
                <span>{this.props.t?.play_now}</span>
              </ButtonSecondary>
            ) : (
              <ButtonPrimary size="sm" className="u-text-transform-capitalize">
                <PlayIcon size="sm" className="u-margin-right--sm" />
                <span>{this.props.t?.play_now}</span>
              </ButtonPrimary>
            )}
          </TrackClick>
        </Flex.Item>
      </Flex>
    );
  };

  renderFooter = () => {
    return (
      <LiveCasinoCardFooter
        players={this.liveCasinoLobby.numberOfPlayers}
        provider={this.liveCasinoLobby.provider}
        providerLogos={this.props.t?.provider_logos}
      />
    );
  };

  renderHeaderNoLobby = () => {
    const { isInMaintenance } = this.props.game;
    return (
      <div
        className="o-ratio o-ratio--live-casino-card"
        onClick={this.onLaunchGame}
      >
        <ImageLazy
          className="o-ratio__content t-border-r"
          src={this.props.game.backgroundImage}
          mark={this.props.game.logo}
          alt={this.props.game.name}
          width={330}
          height={186}
          imgixOpts={{
            w: 328,
            h: 186,
            q: 70,
            crop: "faces",
            fit: "crop",
            markalign: "middle,center",
            markfit: "max",
          }}
        />
        <Flex
          direction="vertical"
          align="end"
          justify="space-between"
          className="o-ratio__content u-font-weight-bold"
          style={{
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
          }}
        >
          <GameTileHeart
            containerClassName="text-white"
            heartClassName="u-width--4xlg u-height--4xlg u-padding--md"
            gameId={this.props.game.id}
            gameName={this.props.game.name}
          />
        </Flex>
        {isInMaintenance && (
          <div className="c-live-casino-card-maintenance__notification u-font-sm u-text-align-center o-position--absolute u-width--full o-inset-bottom--none u-height--2xlg text-white u-font-weight-bold t-opacity--75 bg-black">
            <span>{this.props.t?.table_temporarily_unavailable}</span>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { isInMaintenance } = this.props.game;
    if (!this.liveCasinoLobby) {
      return (
        <Card
          className={cx(
            "u-width--full u-height--full bg-white t-border-r--md t-box-shadow u-overflow--hidden",
            isInMaintenance &&
              "c-live-casino-card-maintenance u-pointer--none o-position--relative"
          )}
          spacing="md"
          header={this.renderHeaderNoLobby}
          footer={() => (
            <LiveCasinoCardFooter
              provider={this.props.game.gameStudio}
              providerLogos={this.props.t?.provider_logos}
            />
          )}
          content={this.renderContent}
        />
      );
    }

    return (
      <Card
        className={cx(
          "u-width--full u-height--full bg-white t-border-r--md t-elevation--10 u-overflow--hidden",
          isInMaintenance &&
            "c-live-casino-card-maintenance o-position--relative u-pointer--none"
        )}
        spacing="md"
        header={this.renderHeader}
        content={this.renderContent}
        footer={this.renderFooter}
      />
    );
  }
}
