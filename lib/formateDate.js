const formate = (isoDate) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(isoDate);
  return `${date.getUTCDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export default formate;
