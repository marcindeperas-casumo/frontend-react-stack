import React from "react";
import { useSelector } from "react-redux";
import { playerCurrencySymbolSelector } from "Models/player";
import { ContentHtml } from "./ContentHtml";

type Props = {
  html: string;
  gridColumnWidth?: string;
  blockTitle?: string;
  expandable?: boolean;
  onClickExpand?: () => void;
  className?: string;
  style?: string;
};

export const ContentHtmlContainer = (props: Props) => {
  const currencySymbol = useSelector(playerCurrencySymbolSelector);
  const currencyTemplateLiteralRegex = /\${\.\|CCY}/g;
  const interpolateHtmlCurrency = props?.html.replace(
    currencyTemplateLiteralRegex,
    currencySymbol
  );

  return <ContentHtml {...props} html={interpolateHtmlCurrency} />;
};
