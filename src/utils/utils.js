export const checkInHistory = (history, video) => {
  return history.findIndex((item) => item.videoId === video.videoId) === -1
    ? true
    : false;
};
