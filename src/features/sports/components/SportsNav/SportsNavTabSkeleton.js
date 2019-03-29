import React from "react";

const SportsNavTabSkeleton = () => (
  <div style={{ marginLeft: 32 }}>
    <div
      style={{
        backgroundColor: "#FFF",
        height: 32,
        width: 32,
        borderRadius: 16,
        margin: "0 auto",
      }}
    />
    <div
      style={{
        backgroundColor: "#FFF",
        width: 50,
        height: 8,
        borderRadius: 3,
        marginTop: 12,
      }}
    />
  </div>
);

export default SportsNavTabSkeleton;
