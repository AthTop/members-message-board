const { UnauthorizedError } = require("../lib/errors");

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const authErr = new UnauthorizedError("Unauthorized");
    next(authErr);
  }
};