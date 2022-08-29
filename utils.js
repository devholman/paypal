const getTime = () => {
  const dateTime = new Date();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

module.exports = { getTime };
