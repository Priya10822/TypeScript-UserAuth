"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const email = req.body.email;
    const password = req.body.password;
    console.log("Email or Password", email, password);
    const useremail = (yield user_1.UserModel.findOne({
        email: email,
    }));
    console.log("useremail", useremail);
    if (useremail) {
        const number = 3 * 24 * 60 * 60 * 1000;
        const token = useremail.generateAuthToken();
        res.cookie("jwt", token, {
            maxAge: number,
            httpOnly: true,
        });
    }
    else {
        res.status(404).json({
            message: "Username and password incorrect",
        });
    }
    bcryptjs_1.default.compare(password, useremail.password, (err, match) => {
        if (err)
            throw err;
        if (match) {
            res.redirect("/profile");
        }
        if (!match) {
            res.status(400).json({
                message: "Invalid credentials",
            });
        }
    });
});
exports.login = login;
