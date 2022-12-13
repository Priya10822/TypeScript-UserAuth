"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const email_validator_1 = __importDefault(require("email-validator"));
const signup = (req, res) => {
    const { email, username, password, confirmpassword } = req.body;
    if (email_validator_1.default.validate(email)) {
        console.log("Email is valid");
    }
    else {
        res.render("signup", { err: "Email is inValid !" });
    }
    if (!email || !username || !password || !confirmpassword) {
        res.render("signup", { err: "All Fields Required !" });
    }
    else if (password != confirmpassword) {
        res.render("signup", { err: "Password Don't Match !" });
    }
    else {
        // check if a user exists
        user_1.UserModel.findOne({ $or: [{ email: email }, { username: username }] }, function (err, data) {
            if (err)
                throw err;
            if (data) {
                res.render("signup", { err: "User Exists, Try Logging In !" });
            }
            else {
                bcryptjs_1.default.genSalt(12, (err, salt) => {
                    if (err)
                        throw err;
                    // hash the password
                    bcryptjs_1.default.hash(password, salt, (err, hash) => {
                        if (err)
                            throw err;
                        // save user in db
                        new user_1.UserModel({
                            username: username,
                            email: email,
                            password: hash,
                            provider: "email",
                        }).save((err, data) => {
                            if (err) {
                                // console.log(err.errors['username'].message);
                                res.status(400).json({
                                    statuscode: 400,
                                    message: err.message,
                                });
                            }
                            else {
                                res.redirect("/login");
                            }
                        });
                    });
                });
            }
        });
    }
};
exports.signup = signup;
