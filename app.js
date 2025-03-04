const express = require("express");
const db = require("./db/queries");
const session = require("express-session");
const passport = require("passport");
const registerRoute = require("./routes/register");
const indexRoute = require("./routes/index");
const successRoute = require("./routes/success");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const secretRoute = require("./routes/secret");
const { DatabaseError } = require("pg");
const { UnauthorizedError } = require("./lib/errors");
require("dotenv").config();

const app = express();
// App config
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session
const sessionStore = new (require("connect-pg-simple")(session))({
  pool: db.pool,
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use((req, res, next) => {
  res.locals.siteTitle = "MessageBoard";
  res.locals.currentUser = req.user;
  console.log(req.session);
  console.log(req.user);
  next();
});

// Routes
app.use("/register", registerRoute);
app.use("/success", successRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/secret", secretRoute);
app.use("/", indexRoute);

app.use("/", (err, req, res, next) => {
  res.locals.pageTitle = "Error";
  if (err instanceof DatabaseError) {
    res.locals.error = "An internal server error has occurred.";
    res.locals.errorStatus = 500;
    return res.status(500).render("error");
  }
  if (err instanceof UnauthorizedError) {
    res.locals.error = "You don't have permission to view this resource";
    res.locals.errorStatus = err.status;
    return res.status(err.status).render("error");
  }
  res.locals.error = "Other error";
  res.locals.errorStatus = 500;
  return res.status(err.status).render("error");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
