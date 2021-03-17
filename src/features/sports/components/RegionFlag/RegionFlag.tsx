import React from "react";

type Props = {
  regionCode: string;
  size?: number;
  className?: string;
};

export const RegionFlag = ({ regionCode, size = 16, className }: Props) => {
  return (
    <img
      className={className}
      width={size}
      height={size}
      src={`https://cms.casumo.com/wp-content/uploads/2019/03/${regionCode}.svg`}
      alt={regionCode}
    />
  );
};
