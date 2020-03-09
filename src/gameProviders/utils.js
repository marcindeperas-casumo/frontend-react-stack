export const expandIframeHeightToMatchItsParent = iframeRef => {
  if (iframeRef.current) {
    /* eslint-disable fp/no-mutation */
    iframeRef.current.style.height = `${iframeRef.current.parentNode.clientHeight}px`;
    iframeRef.current.style.width = `${iframeRef.current.parentNode.clientWidth}px`;
    /* eslint-enable fp/no-mutation */
  }
};
