"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cookie_parser_1 = require("cookie-parser");
var express_session_1 = require("express-session");
var MemoryStore = require("memorystore")(express_session_1["default"]);
var connect_flash_1 = require("connect-flash");
var body_parser_1 = require("body-parser");
var mongo_key_1 = require("./config/mongo_key");
var app = (0, express_1["default"])();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express_1["default"].urlencoded({ extended: true }));
mongoose_1["default"]
    // .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(mongo_key_1["default"])
    .then(function () { return console.log("Connected !"); });
app.use((0, cookie_parser_1["default"])());
app.use(body_parser_1["default"].urlencoded({
    extended: true
}));
app.use(body_parser_1["default"].json());
app.use((0, express_session_1["default"])({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    //max age to longer duration
    // maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore()
}));
app.use((0, connect_flash_1["default"])());
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash("success_messages");
    res.locals.error_messages = req.flash("error_messages");
    res.locals.error = req.flash("error");
    next();
});
app.use(require("./middleware/routes"));
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () { return console.log("Server Started At " + PORT); });
