// @flow
import React, { useEffect } from "react";
import Button from "@casumo/cmp-button";
import { DownloadIcon } from "@casumo/cmp-icons";

export type PdfButtonProps = {
  href?: string,
  label: string,
  fetchHref: () => void,
};

export function PdfButton({ href, fetchHref, label }: PdfButtonProps) {
  const isDisabled = Boolean(!href);

  useEffect(() => {
    if (href) {
      return;
    }

    fetchHref();
  });

  return (
    <Button
      href={href}
      className="u-margin-top--lg u-margin-bottom--md"
      disabled={isDisabled}
      loading={isDisabled}
      target="_blank"
    >
      <DownloadIcon />
      {label}
    </Button>
  );
}
