export const getCookie = name => {
  const cookie = document?.cookie?.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookie ? cookie[2] : null;
};
