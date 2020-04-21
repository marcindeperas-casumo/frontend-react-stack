// @flow
import React, { PureComponent, type Node } from "react";
import { EditIcon, ExclamationMarkIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import { SettingsLabelAndValue } from "Components/Settings/SettingsLabelAndValue/SettingsLabelAndValue";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, KO_EVENTS } from "Src/constants";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import {
  PASSWORD_PLACEHOLDER_VALUE,
  onOldStackEvent,
  doesContainJapaneseCharacters,
} from "./utils";

type Props = {
  player: A.SETTINGS_PLAYER,
  labels: {
    name: ?string,
    email: ?string,
    password: ?string,
    mobileNumber: ?string,
    address: ?string,
    edit: ?string,
    verify: ?string,
    gamblingExtent: ?string,
  },
  refetchSettings: () => {},
};

const { ACCOUNT_SETTINGS } = MODALS;

const RowTemplate = ({
  label,
  value,
  action,
  onClick,
}: {
  label: ?string,
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
    const labelsAndDetails = { labels, details };

    return (
      <div className="u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop">
        <div className="t-box-shadow--lg@tablet t-box-shadow--lg@desktop">
          <Name {...labelsAndDetails} />
          <Email {...labelsAndDetails} />
          <ExtentOfGambling {...labelsAndDetails} />
          {details.canChangePassword && <Password labels={labels} />}
          {details.phoneNumber.verified ? (
            <VerifiedMobileNumber {...labelsAndDetails} />
          ) : (
            <UnverifiedMobileNumber {...labelsAndDetails} />
          )}
          <Address {...labelsAndDetails} />
        </div>
      </div>
    );
  }
}

const Name = ({ labels, details }) => {
  const fullName = doesContainJapaneseCharacters(details.name.first)
    ? `${details.name.last} ${details.name.first}`
    : `${details.name.first} ${details.name.last}`;

  return <RowTemplate label={labels.name} value={fullName} />;
};

const Email = ({ labels, details }) => (
  <RowTemplate
    onClick={() => launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_EMAIL })}
    label={labels.email}
    value={details.email}
    action={
      <EditIcon className="t-background-chrome-light-2 t-color-chrome-dark-3 u-padding t-border-r--circle" />
    }
  />
);

const ExtentOfGambling = ({ labels, details }) => {
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

const Password = ({ labels }) => {
  return (
    <RowTemplate
      onClick={() => launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_PASSWORD })}
      label={labels.password}
      value={PASSWORD_PLACEHOLDER_VALUE}
      action={
        <EditIcon className="t-background-chrome-light-2 t-color-chrome-dark-3 u-padding t-border-r--circle" />
      }
    />
  );
};

const VerifiedMobileNumber = ({ labels, details }) => (
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

const UnverifiedMobileNumber = ({ labels, details }) => (
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

const Address = ({ labels, details }) => (
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
