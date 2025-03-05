const { DatabaseError } = require("pg");
const db = require("../db/queries");

exports.get = async (req, res, next) => {
  const messageId = req.params.id;
  try {
    await db.deleteMessageById(messageId);
    res.redirect("/board");
  } catch (err) {
    const dbErr = new DatabaseError();
    return next(dbErr);
  }
};
