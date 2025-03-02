require("../lib/errors")

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (isMember(req.user)) res.locals.member = true;
    if (isAdmin(req.user)) res.locals.admin = true;
    next();
  } else {
    next(new UnauthorizedError("Unauthorized"));
  }
};

const isMember = (user) => {
  return user.member;
};

const isAdmin = (user) => {
  return user.admin;
};
