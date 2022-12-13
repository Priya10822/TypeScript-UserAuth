import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
const MemoryStore = require("memorystore")(expressSession);
import flash from "connect-flash";
import bodyParser from "body-parser";
import mongoURI from "./config/mongo_key";
import router from "./middleware/routes";
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));

mongoose
  // .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .connect(mongoURI)
  .then(() => console.log("Connected !"));

app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    //max age to longer duration
    // maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
  })
);

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  res.locals.error = req.flash("error");
  next();
});

app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server Started At " + PORT));
