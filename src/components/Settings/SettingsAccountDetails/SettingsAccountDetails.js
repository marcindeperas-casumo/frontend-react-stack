// @flow
import React, { PureComponent, type Node } from "react";
import { EditIcon, ExclamationMarkIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SettingsLabelAndValue } from "Components/Settings/SettingsLabelAndValue/SettingsLabelAndValue";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, KO_EVENTS } from "Src/constants";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { PASSWORD_PLACEHOLDER_VALUE, onOldStackEvent } from "./utils";

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
  onClick,
}: {
  label: string,
  value?: Node,
  action?: Node,
  onClick?: () => void,
}) => (
  <div onClick={onClick}>
    <SettingsRow text={<SettingsLabelAndValue label={label} value={value} />}>
      {action}
    </SettingsRow>
  </div>
);

export class SettingsAccountDetails extends PureComponent<Props> {
  static defaultProps = {
    labels: {},
  };

  componentDidMount() {
    const { refetchSettings } = this.props;
    onOldStackEvent(KO_EVENTS.ACCOUNT_SETTINGS.COMMAND_EXECUTED, data => {
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
      <RowTemplate
        onClick={() => launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_EMAIL })}
        label={labels.email}
        value={details.email}
        action={
          <EditIcon className="t-background-chrome-light-2 t-color-chrome-dark-3 u-padding t-border-r--circle" />
        }
      />
    );

    const ExtentOfGambling = () => {
      if (details.extentOfGambling.canChange) {
        return (
          <RowTemplate
            onClick={() =>
              launchModal({
                modal: ACCOUNT_SETTINGS.CHANGE_EXTENT_OF_GAMBLING,
              })
            }
            label={labels.gamblingExtent}
            action={
              <EditIcon className="t-background-chrome-light-2 t-color-chrome-dark-3 u-padding t-border-r--circle" />
            }
            value={details.extentOfGambling.label}
          />
        );
      }
      return null;
    };

    const Password = () => {
      if (details.canChangePassword) {
        return (
          <RowTemplate
            onClick={() =>
              launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_PASSWORD })
            }
            label={labels.password}
            value={PASSWORD_PLACEHOLDER_VALUE}
            action={
              <EditIcon className="t-background-chrome-light-2 t-color-chrome-dark-3 u-padding t-border-r--circle" />
            }
          />
        );
      }
      return null;
    };

    const VerifiedMobileNumber = () => (
      <RowTemplate
        onClick={() =>
          launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_MOBILE_NUMBER })
        }
        label={labels.mobileNumber}
        value={`(${details.phoneNumber.prefix}) ${details.phoneNumber.number}`}
        action={
          <EditIcon className="t-background-chrome-light-2 t-color-chrome-dark-3 u-padding t-border-r--circle" />
        }
      />
    );

    const UnverifiedMobileNumber = () => (
      <a href="/player/settings/phone-number">
        <RowTemplate
          label={labels.mobileNumber}
          value={`(${details.phoneNumber.prefix}) ${details.phoneNumber.number}`}
          action={
            <Flex align="center" spacing="sm">
              <Flex.Item>
                <ExclamationMarkIcon
                  size="sm"
                  className="t-color-negative t-border--current-color t-border t-border-r--circle t-border-width--md"
                />
              </Flex.Item>
              <Flex.Item>
                <Text tag="strong" size="sm" className="t-color-negative">
                  {labels.verify}
                </Text>
              </Flex.Item>
            </Flex>
          }
        />
      </a>
    );

    const MobileNumber = () =>
      details.phoneNumber.verified ? (
        <VerifiedMobileNumber />
      ) : (
        <UnverifiedMobileNumber />
      );

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
      <div className="u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop t-box-shadow--lg@tablet t-box-shadow--lg@desktop">
        <Name />
        <Email />
        <ExtentOfGambling />
        <Password />
        <MobileNumber />
        <Address />
      </div>
    );
  }
}
