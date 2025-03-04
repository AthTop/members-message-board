const { DatabaseError } = require("pg");
const db = require("../db/queries");
const { isAuth } = require("../routes/authMiddleware");

exports.get = [
  isAuth,
  async (req, res, next) => {
    try {
      const messages = await db.getMessages();
      if (messages) {
        res.locals.pageTitle = "Board";
        res.locals.messages = messages;
        res.render("board");
      }
    } catch (err) {
      const dbErr = new DatabaseError();
      return next(dbErr);
    }
  },
];

exports.getNewpost = [
  isAuth,
  (req, res) => {
    res.locals.pageTitle = "New Post";
    res.render("newpost");
  },
];

exports.post = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (title && text) {
      await db.postMessage(title, text, req.user.id);
      res.redirect("/board");
    }
  } catch(err) {
    const dbErr = new DatabaseError();
    return next(dbErr);
  }
}