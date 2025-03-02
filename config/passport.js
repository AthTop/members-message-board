const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const { validatePassword } = require("../lib/passwordUtils");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserByUsername(username);
    if (!user) {
      return done(null, false);
    }
    if (validatePassword(password, user.password_hash)) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
