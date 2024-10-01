const parseTimeStamp = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours();

  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}`;
};

export { parseTimeStamp };
