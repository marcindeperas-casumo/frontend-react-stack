import gql from "graphql-tag";

export const SET_ADVENTURER_PUBLICITY = gql`
  mutation SetAdventurerPublicity($input: ContactSettingsInput) {
    setAdventurerPublicity(input: $input)
  }
`;

export const SET_WITHDRAWAL_NOTIFICATIONS = gql`
  mutation SetWithdrawalNotifications($input: ContactSettingsInput) {
    setWithdrawalNotifications(input: $input)
  }
`;

export const SET_NEWSLETTER_SUBSCRIPTION = gql`
  mutation SetNewsletterSubscription($input: ContactSettingsInput) {
    setNewsletterSubscription(input: $input)
  }
`;

export const SET_SMS_NEWSLETTER_SUBSCRIPTION = gql`
  mutation SetSMSNewsletterSubscription($input: ContactSettingsInput) {
    setSMSNewsletterSubscription(input: $input)
  }
`;

export const SET_CONTACT_BY_PHONE = gql`
  mutation SetContactByPhone($input: ContactSettingsInput) {
    setContactByPhone(input: $input)
  }
`;

export const SET_CONTACT_BY_POST = gql`
  mutation SetContactByPost($input: ContactSettingsInput) {
    setContactByPost(input: $input)
  }
`;
