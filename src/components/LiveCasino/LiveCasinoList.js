import React from "react";

import Heading from "@casumo/cmp-heading";
import ScrollingContainer from "@casumo/cmp-scrollable";

import Card from "./Card";
import LiveCasinoTableData from "./LiveCasinoTableData";

// TODO get placeholder if no image
const getImg = o =>
  o.videoSnapshot && o.videoSnapshot.thumbnails
    ? o.videoSnapshot.thumbnails["L"]
    : null;

const getOverlayData = (o, type) =>
  o.gameType === "Roulette" ? (
    <LiveCasinoTableData results={o.results} />
  ) : null;

// TODO get active currency
const getBetLimits = betLimits => betLimits["EUR"] || betLimits[0];

const LiveCasinoList = ({ title, type, data, ...props }) => (
  <div className="u-padding-bottom--semi@mobile">
    <Heading
      className="u-padding-top--semi u-padding-bottom--small u-padding-left--small u-padding-left--xlarge@tablet
      u-padding-bottom--normal@tablet u-padding-left--xlarge@desktop u-padding-bottom--normal@desktop"
      text={title}
      rank={3}
      size="uno"
    />
    <ScrollingContainer padded>
      {data.length === 0 ? (
        <div>EMPTY_LIST</div>
      ) : (
        data.map(o => (
          <Card
            className="u-padding-right--small"
            key={o.id}
            imgSrc={getImg(o)}
            overlayData={getOverlayData(o, type)}
            title={o.name}
            betLimits={getBetLimits(o.betLimits)}
            players={o.players}
          />
        ))
      )}
    </ScrollingContainer>
  </div>
);

export default LiveCasinoList;
