// @flow
import * as React from "react";
import { formatCurrency, formatTime } from "Utils";
import { Row } from "./Row";
import { Header } from "./Header";
type Props = {
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    t: ?{
        session_details_header: string;
        money_wagered: string;
        money_won: string;
        money_left: string;
        play_started: string;
        play_ended: string;
    };
    locale: string;
    currency: string;
    moneyWagered: number;
    moneyWon: number;
    moneyLeft: number;
    playStartedTime: number;
    playEndedTime: number;
};
export function SessionDetailsBody(props: Props) {
    const { locale, currency, moneyWon, moneyWagered, moneyLeft, playStartedTime, playEndedTime, } = props;
    const t = props.t || {};
    const formatCurrencyBound = (value: number) => formatCurrency({
        value,
        currency,
        locale,
    });
    return (<>
      <Header>{(t as any).session_details_header}</Header>
      <Row label={(t as any).money_wagered} value={formatCurrencyBound(moneyWagered)}/>
      <Row label={(t as any).money_won} value={formatCurrencyBound(moneyWon)}/>
      <Row label={(t as any).money_left} value={formatCurrencyBound(moneyLeft)}/>
      <Row label={(t as any).play_started} value={formatTime(playStartedTime)}/>
      <Row label={(t as any).play_ended} value={formatTime(playEndedTime)}/>
    </>);
}
