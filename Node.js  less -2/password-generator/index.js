const cryptoRandomString = require('crypto-random-string');

function generatePassword(length = 12) {
  return cryptoRandomString({ length, type: 'alphanumeric' });
}

module.exports = generatePassword;
