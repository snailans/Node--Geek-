const generatePassword = require('password-generator');

// Генерация пароля длиной 12 символов (по умолчанию)
const password = generatePassword();

console.log("Сгенерированный пароль:", password);
