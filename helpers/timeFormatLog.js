function timeFormatLog() {
  const date = new Date();
  const options = {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateFormatter = new Intl.DateTimeFormat("en-GB", options);
  const dateInLA = dateFormatter.format(date);

  return dateInLA;
}

module.exports = timeFormatLog;
