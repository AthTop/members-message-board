const { body } = require("express-validator");
const db = require("../db/queries");
const { DatabaseError } = require("pg");

exports.validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 5, max: 16 })
    .withMessage("Username must be between 5 and 16 characters")
    .custom(async (username) => {
      try {
        const user = await db.getUserByUsername(username);
        if (user) {
          throw new Error("Username already exists");
        }
      } catch (err) {
        const dbErr = new DatabaseError("Database error occurred", "DB_ERROR")
        return next(dbErr);
      }
    }),
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must contain only letters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must contain only letters"),
  body("password")
    .trim()
    .isStrongPassword({ minLength: 5, minUppercase: 1, minNumbers: 1 })
    .withMessage(
      "Password must be at least 5 characters long, contain 1 uppercase and 1 number"
    ),
  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      return confirmPassword === req.body.password;
    })
    .withMessage("Passwords must match"),
];
