import React from "react";

const GamePlate = ({ logoBackground, logo, name, slug, inMaintenanceMode }) => (
  <div>
    <a href={`/en/play/${slug}`}>
      <div
        style={{
          position: "relative",
          width: "156px",
          display: "block",
          height: "190px",
          filter: `grayscale(${inMaintenanceMode ? 1 : 0})`
        }}
      >
        <img
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%"
          }}
          src={logoBackground}
          alt={name}
        />
        <img
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%"
          }}
          src={logo}
          alt={name}
        />
      </div>
    </a>
  </div>
);

export default GamePlate;
