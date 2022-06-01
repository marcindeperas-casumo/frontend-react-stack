import * as React from "react";
import { ItemSkeleton, Header } from "@casumo/frontend-kyc-react";

export type Props = {
  id?: string;
  redirectioUrl?: string;
  onHeaderAction: () => void;
  content: {
    header: string;
  };
};

export function AccountVerificationUpload({
  id = "jumio-test",
  redirectioUrl,
  onHeaderAction,
  content,
}: Props) {
  return redirectioUrl ? (
    <div className="flex flex-col border-t border-grey-0">
      <Header title={content.header} onAction={onHeaderAction} bordered />
      <iframe
        style={{ minHeight: 600 }}
        allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
        allowFullScreen
        src={redirectioUrl}
        id={id}
        name={id}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
      ></iframe>
    </div>
  ) : (
    <div className="tablet:p-md">
      <ItemSkeleton />
    </div>
  );
}
