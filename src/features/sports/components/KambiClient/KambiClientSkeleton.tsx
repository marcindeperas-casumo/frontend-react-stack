import * as React from "react";

const KambiClientSkeleton = () => (
  <div className="p-md max-w-sm w-full mx-auto">
    {[...Array(12)].map((e, i) => {
      return (
        <div className="animate-pulse flex space-x-sm space-y-md" key={i}>
          <div className="flex-1 space-y-sm py-md">
            <div className="h bg-grey-20 rounded w-5/6"></div>
            <div className="h bg-grey-20 rounded w-3/4"></div>
          </div>
          <div className="flex-1 flex space-x-sm py-xs">
            <div className="h-2xlg bg-grey-20 rounded w-3/4"></div>
            <div className="h-2xlg bg-grey-20 rounded w-5/6"></div>
          </div>
        </div>
      )
    })}
  </div>
);

export default KambiClientSkeleton;
