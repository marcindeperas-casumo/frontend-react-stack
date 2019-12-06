export const fakeAction = () => console.log("live");

export const menu = [
  { name: `Your settings`, link: `/somewhere/gamebrowser`},
  { name: `Play Okay Settings`, link: `/somewhere/poks` },
  { name: `Email us`, link: `/somewhere/email` },
  { name: `Live chat`, link: ``, action: fakeAction},
  { name: `Play Okay`, link: `/somewhere/pok` },
  { name: `Blog`, link: `/somewhere/blog` },
  { name: `FAQ`, link: `/somewhere/faq` },
  { name: `About Casumo`, link: `/somewhere/about` },
  { name: `Log out`, link: `/somewhere/logout` },
];

export const menuShort = [
  { name: `Log out`, link: `/somewhere/logout` }
];

export const wallet = { cash: `$199.23`, bonus: `` };
export const walletUK = { cash: `£987.65`, bonus: `+ £55.03 Bonus` };
export const username = `username`;