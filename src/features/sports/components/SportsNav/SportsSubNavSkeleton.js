import React from "react";
import Skeleton from "@casumo/cmp-skeleton";

const SportsSubNavSkeleton = () => (
  <Skeleton viewBox={null} width="100%" height={100}>
    <rect rx={16} ry={16} x={24} y={20} height={32} width={148} />
    <rect rx={16} ry={16} x={184} y={20} height={32} width={90} />
    <rect rx={16} ry={16} x={286} y={20} height={32} width={171} />
  </Skeleton>
);

export default SportsSubNavSkeleton;
