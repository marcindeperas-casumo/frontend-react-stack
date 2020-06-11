// @flow
import React, { useEffect } from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import { DownloadIcon } from "@casumo/cmp-icons";

export type PdfButtonProps = {
  href?: string,
  label: string,
  fetchHref?: () => void,
};

export function PdfButton({
  href,
  fetchHref = () => {},
  label,
}: PdfButtonProps) {
  const isDisabled = !href;

  useEffect(() => {
    if (!href) {
      fetchHref();
    }
  }, [fetchHref, href]);

  return (
    <ButtonPrimary
      href={href}
      className="u-margin-top--lg u-margin-bottom--md"
      isDisabled={isDisabled}
      isLoading={isDisabled}
      target="_blank"
    >
      <DownloadIcon />
      {label}
    </ButtonPrimary>
  );
}
