exports.get = (req, res) => {
  res.locals.message = req.session.message;
  res.locals.pageTitle = "Success";
  res.render("success");
};
