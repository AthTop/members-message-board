const express = require("express");
const db = require("./db/queries");
const session = require("express-session");
const passport = require("passport");
const registerRoute = require("./routes/register");
const indexRoute = require("./routes/index");
const successRoute = require("./routes/success");
const { DatabaseError } = require("pg");
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

// Middleware
app.use((req, res, next) => {
  res.locals.siteTitle = "MessageBoard";
  next();
});

// Routes
app.use("/register", registerRoute);
app.use("/success", successRoute);
app.use("/", indexRoute);

app.use("/", (err, req, res, next) => {
  if (err instanceof DatabaseError) {
    res.locals.pageTitle = "Error";
    res.locals.error = "An internal server error has occurred.";
    res.locals.errorStatus = 500;
    res.status(500).render("error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
