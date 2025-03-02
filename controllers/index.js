exports.get = (req, res) => {
    res.locals.pageTitle = "Home";
    res.render("index");
}