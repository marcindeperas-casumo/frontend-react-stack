export const toMobileNumber = phoneNumber =>
  `${phoneNumber.prefix} ${phoneNumber.number}`;

export const toAddress = address => [
  address.addressLines.street,
  address.addressLines.city,
  address.addressLines.zip,
  address.country
];

export const toPlayerSettingsData = data => {
  if (!data) {
    return {};
  }
  return {
    fullName: `${data.contactInfo.name.firstName} ${
      data.contactInfo.name.lastName
    }`,
    email: data.contactInfo.email,
    mobileNumber: toMobileNumber(data.contactInfo.phoneNumber),
    address: toAddress(data.contactInfo.primaryAddress),
    offersByEmail: true
  };
};

export const sleep = ms => data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
};

export const bridgeFactory = () => {
  const obj = {};
  return {
    on: (ev, cb) => {
      if (!obj[ev]) {
        obj[ev] = [];
      }

      obj[ev].push(cb);
    },
    emit: (ev, data) => {
      console.log("🌈 Emitting event", { ev, data });

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    }
  };
};

export const cacheLocallyForMs = ms => {
  let lastUpdated = 0;
  let lastValue;
  console.log(`🏝 Setting up local cache for ${ms}ms`);

  return performCall => (...args) => {
    const now = new Date().getTime();
    console.log(`🏝 Last updated: ${lastUpdated}, now: ${now}`);
    if (now - lastUpdated <= ms) {
      console.log(
        `🏝 Still ${ms - (now - lastUpdated)}ms before the cache expires.`,
        { lastValue }
      );
      return Promise.resolve(lastValue);
    }

    console.log(`🏝 Returning a promise to perform work`);
    return new Promise(resolve => {
      console.log(`🏝 Performing work`);
      return resolve(performCall(...args));
    })
      .then(value => {
        lastValue = value;
        lastUpdated = new Date().getTime();
        console.log(`🏝 Work performed updating internal values`, {
          lastValue,
          lastUpdated
        });

        return value;
      })
      .catch(console.error);
  };
};
