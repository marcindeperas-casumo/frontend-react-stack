import React from "react";
import LazyImage from "./LazyImage";

export default ({ logoBackground, logo, name, slug, inMaintenanceMode }) => (
  <div
    style={{
      display: inMaintenanceMode && "none"
    }}
  >
    <a href={`/en/play/${slug}`}>
      <div
        style={{
          position: "relative",
          width: "156px",
          display: "block",
          height: "190px",
          backgroundColor: "#efefef",
          filter: `grayscale(${inMaintenanceMode ? 1 : 0})`
        }}
      >
        {
          <LazyImage
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
        }
        {
          <LazyImage
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
        }
      </div>
    </a>
  </div>
);
