import React from "react";

const SportsNavTabSkeleton = () => (
  <div style={{ marginLeft: 32 }}>
    <div
      style={{
        backgroundColor: "#FFF",
        height: 50,
        width: 50,
        borderRadius: 25,
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
