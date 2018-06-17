import React from "react";

const ScrollingContainer = ({ children }) => (
  <div
    style={{
      display: "flex",
      overflow: "scroll"
    }}
  >
    {children}
  </div>
);

export default ScrollingContainer;
