import * as React from "react";
import { Introduction } from "@casumo/frontend-kyc-react";

type Props = {
  content: {
    introduction: {
      title: string;
      text: string;
    };
  };
};

export function AccountVerification({ content }: Props) {
  return (
    <div className="h-full flex flex-col justify-center tablet:px-md">
      <div className="p-md">
        <Introduction {...content.introduction} />
      </div>
    </div>
  );
}
