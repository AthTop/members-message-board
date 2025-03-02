const db = require("../db/queries");
const { validationResult } = require("express-validator");
const { validateRegister } = require("../lib/validateRegister");
const { DatabaseError } = require("pg");
const bcrypt = require("bcryptjs");

exports.getForm = (req, res) => {
  res.locals.pageTitle = "Register";
  res.render("register");
};

exports.postForm = [
  validateRegister,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { username, firstName, lastName } = req.body;
      res.locals.pageTitle = "Register";
      res.locals.form = { username, firstName, lastName };
      res.locals.inputErrors = errors.array();
      res.status(400).render("register");
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.insertNewUser(username, firstName, lastName, hashedPassword);
      req.session.message = "Registered successfully";
      res.redirect("/success");
    } catch (err) {
      const dbErr = new DatabaseError();
      next(dbErr);
    }
  },
];
