const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();
const hbs = exphbs.create({});
const passport = require("passport");
const passportGoogle = require("./config/passport-google");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const routes = require("./controllers");
const PORT = process.env.PORT || 3000;
const compression = require("compression");
global.__basedir = __dirname;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  rolling: true,
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(compression());

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on port: 3000"));
});
