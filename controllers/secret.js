const { isAuth } = require("../routes/authMiddleware");
const db = require("../db/queries");
const { DatabaseError } = require("pg");
require("dotenv").config();

exports.get = [
  isAuth,
  (req, res) => {
    res.locals.pageTitle = "Secret";
    if (!req.user.member) {
      return res.render("secret");
    } else if (!req.user.admin) {
      return res.render("secret");
    } else {
      return res.render("secret");
    }
  },
];

exports.post = async (req, res, next) => {
  const answer = req.body.answer;
  const wrongAnswerError = [{ msg: "Wrong answer!" }];
  try {
    if (!req.user.member) {
      if (answer === process.env.RIDDLE_MEMBER) {
        req.user.member = true;
        await db.setMember(req.user.id);
        return res.redirect("/");
      } else {
        res.locals.inputErrors = wrongAnswerError;
        return res.status(401).render("secret");
      }
    }
    if (!req.user.admin) {
      if (answer === process.env.RIDDLE_ADMIN) {
        req.user.admin = true;
        await db.setAdmin(req.user.id);
        return res.redirect("/");
      } else {
        res.locals.inputErrors = wrongAnswerError;
        return res.status(401).render("secret");
      }
    }
  } catch (err) {
    const dbErr = new DatabaseError();
    return next(dbErr);
  }
};
