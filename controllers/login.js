const passport = require("passport");

exports.get = (req, res) => {
  res.locals.pageTitle = "Login";
  res.render("login");
};

exports.post = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
});
