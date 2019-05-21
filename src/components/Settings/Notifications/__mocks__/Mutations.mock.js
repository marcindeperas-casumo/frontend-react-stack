import {
  SET_ADVENTURER_PUBLICITY,
  SET_WITHDRAWAL_NOTIFICATIONS,
  SET_CONTACT_BY_POST,
  SET_CONTACT_BY_PHONE,
  SET_NEWSLETTER_SUBSCRIPTION,
  SET_SMS_NEWSLETTER_SUBSCRIPTION,
} from "../Mutations";

export const withdrawalNotificationsMock = [true, false].map(on => ({
  request: {
    query: SET_WITHDRAWAL_NOTIFICATIONS,
    variables: { input: { on } },
  },
  result: {
    data: { setWithdrawalNotifications: on },
  },
}));

export const withdrawalNotificationsErrorMock = withdrawalNotificationsMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

export const adventurerPublicityMock = [true, false].map(on => ({
  request: {
    query: SET_ADVENTURER_PUBLICITY,
    variables: { input: { on } },
  },
  result: {
    data: { setAdventurerPublicity: on },
  },
}));

export const adventurerPublicityErrorMock = adventurerPublicityMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

export const contactByPostMock = [true, false].map(on => ({
  request: {
    query: SET_CONTACT_BY_POST,
    variables: { input: { on } },
  },
  result: {
    data: { setContactByPost: on },
  },
}));

export const contactByPostErrorMock = contactByPostMock.map(request => ({
  ...request,
  result: {
    errors: [{ foo: "bar" }],
  },
}));

export const contactByPhoneMock = [true, false].map(on => ({
  request: {
    query: SET_CONTACT_BY_PHONE,
    variables: { input: { on } },
  },
  result: {
    data: { setContactByPhone: on },
  },
}));

export const contactByPhoneErrorMock = contactByPhoneMock.map(request => ({
  ...request,
  result: {
    errors: [{ foo: "bar" }],
  },
}));

export const newsletterSubscriptionMock = [true, false].map(on => ({
  request: {
    query: SET_NEWSLETTER_SUBSCRIPTION,
    variables: { input: { on } },
  },
  result: {
    data: { setNewsletterSubscription: on },
  },
}));

export const newsletterSubscriptionErrorMock = newsletterSubscriptionMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

export const SMSNewsletterSubscriptionMock = [true, false].map(on => ({
  request: {
    query: SET_SMS_NEWSLETTER_SUBSCRIPTION,
    variables: { input: { on } },
  },
  result: {
    data: { setSMSNewsletterSubscription: on },
  },
}));

export const SMSNewsletterSubscriptionErrorMock = SMSNewsletterSubscriptionMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);
