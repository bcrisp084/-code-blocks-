// Express package
const express = require("express");
// Express-session for keeping track of the user
const session = require("express-session");
// Handlebars for frontend templating
const exphbs = require("express-handlebars");
// Creating the express app
const app = express();
const hbs = exphbs.create({});
// passport to be used for alternative login such as google
const passport = require("passport");
// passport config file
const passportGoogle = require("./config/passport-google");
// sequelize connection
const sequelize = require("./config/connection");
// Session store for storing the current user using sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Built in node module for routing in our app using the local directory
const path = require("path");
// Routes to different url's
const routes = require("./controllers");
// Declaring the port locallly or through a third party process
const PORT = process.env.PORT || 3000;
// Compression minifies the repsonse bodies sent over the wire
const compression = require("compression");
// global access in our project to the root directory of this server file
global.__basedir = __dirname;
// Creating the session with options
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
// Setting the view engine to handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// Using the session we created
app.use(session(sess));
// Express lets us parse data that is sent/received from requests
app.use(express.json());
// The option here for encoding the data are using limits for the
// picture size you can upload on the front end
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);
// This sets up the static files in the public folder so we can use them on the client
app.use(express.static(path.join(__dirname, "public")));
// Passport is initialized but session is not used right now
app.use(passport.initialize());
app.use(passport.session());
// Using the routes/controllers we brought in
app.use(routes);
// Using the compression package
app.use(compression());
// Syncing the database but setting force to false which prevents
// dropping the database and recreating each time.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on port: 3000"));
});
