const bcrypt = require("bcryptjs");

const validatePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

const genPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = {
  validatePassword,
  genPassword,
};
