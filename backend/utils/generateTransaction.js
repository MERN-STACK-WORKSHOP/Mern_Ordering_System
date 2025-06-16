/**
 * @description generate a random transaction id using date and random number
 * @returns {string}
 */
const generateTransactionId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = Math.floor(Math.random() * 10000);
  return `${year}${month}${day}${random}`;
};

module.exports = generateTransactionId;
