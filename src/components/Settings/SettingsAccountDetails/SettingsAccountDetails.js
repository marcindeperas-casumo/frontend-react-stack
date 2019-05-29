// @flow
import React, { PureComponent, type Node } from "react";
import { ExclamationMarkIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import Link from "Components/Settings/Link";
import { SettingsLabelAndValue } from "Components/Settings/SettingsLabelAndValue/SettingsLabelAndValue";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, KO_EVENTS } from "Src/constants";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { PASSWORD_VALUE, onKOEvent } from "./utils";
import EditIcon from "./EditIcon.svg"; //TODO: replace on cudl v2 bump

type Props = {
  player: SETTINGS_PLAYER,
  labels: PLAYER_SETTINGS_LABELS_QUERY,
  refetchSettings: () => {},
};

const { ACCOUNT_SETTINGS } = MODALS;

const RowTemplate = ({
  label,
  value,
  action,
}: {
  label: string,
  value?: Node,
  action?: Node,
}) => (
  <SettingsRow
    text={<SettingsLabelAndValue label={label} value={value} />}
    action={action}
  />
);

export class SettingsAccountDetails extends PureComponent<Props> {
  static defaultProps = {
    labels: {},
  };

  componentDidMount() {
    const { refetchSettings } = this.props;
    onKOEvent(KO_EVENTS.ACCOUNT_SETTINGS.COMMAND_EXECUTED, data => {
      if (data.success) {
        refetchSettings();
      }
    });
  }

  render() {
    const {
      labels,
      player: { details },
    } = this.props;

    const Name = () => (
      <RowTemplate
        label={labels.name}
        value={`${details.name.first} ${details.name.last}`}
      />
    );

    const Email = () => (
      <Link
        label={
          <RowTemplate
            label={labels.email}
            value={details.email}
            action={<EditIcon className="t-color-green" />}
          />
        }
        launcher={launchModal}
        target={{ modal: ACCOUNT_SETTINGS.CHANGE_EMAIL }}
      />
    );

    const ExtentOfGambling = () => {
      if (details.extentOfGambling.canChange) {
        return (
          <Link
            label={
              <RowTemplate
                label={labels.gamblingExtent}
                action={<EditIcon className="t-color-green" />}
                value={details.extentOfGambling.label}
              />
            }
            launcher={launchModal}
            target={{ modal: ACCOUNT_SETTINGS.CHANGE_EXTENT_OF_GAMBLING }}
          />
        );
      }
      return null;
    };

    const Password = () => {
      if (details.canChangePassword) {
        return (
          <Link
            label={
              <RowTemplate
                label={labels.password}
                value={PASSWORD_VALUE}
                action={<EditIcon className="t-color-green" />}
              />
            }
            launcher={launchModal}
            target={{
              modal: ACCOUNT_SETTINGS.CHANGE_PASSWORD,
            }}
          />
        );
      }
      return null;
    };

    const MobileNumber = () => {
      if (details.phoneNumber.verified) {
        return (
          <Link
            label={
              <RowTemplate
                label={labels.mobileNumber}
                value={`(${details.phoneNumber.prefix}) ${
                  details.phoneNumber.number
                }`}
                action={<EditIcon className="t-color-green" />}
              />
            }
            launcher={launchModal}
            target={{
              modal: ACCOUNT_SETTINGS.CHANGE_MOBILE_NUMBER,
            }}
          />
        );
      }
      return (
        <Link
          label={
            <RowTemplate
              label={labels.mobileNumber}
              value={`(${details.phoneNumber.prefix}) ${
                details.phoneNumber.number
              }`}
              action={
                <>
                  <ExclamationMarkIcon className="t-color-red" />
                  <Text tag="span" size="sm" className="t-color-red">
                    Verify
                  </Text>
                </>
              }
            />
          }
          target="/player/settings/phone-number"
        />
      );
    };

    const Address = () => (
      <RowTemplate
        label={labels.address}
        value={
          <>
            <div>{details.address.street}</div>
            <div>{details.address.postCode}</div>
            <div>{details.address.city}</div>
            <div>{details.address.country.name}</div>
          </>
        }
      />
    );

    return (
      <>
        <Name />
        <Email />
        <ExtentOfGambling />
        <Password />
        <MobileNumber />
        <Address />
      </>
    );
  }
}
