const { DatabaseError } = require("pg");
const db = require("../db/queries");
const isAuth = require("../routes/authMiddleware");

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
