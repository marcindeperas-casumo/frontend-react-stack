export function setCookie(name: string, value: any, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  // eslint-disable-next-line fp/no-mutation
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
