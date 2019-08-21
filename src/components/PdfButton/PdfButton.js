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
  const isDisabled = !href;

  useEffect(() => {
    if (!href) {
      fetchHref();
    }
  });

  return (
    <Button
      href={href}
      variant="primary"
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
