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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0");
        const token = req.cookies.jwt;
        const verifyUser = jsonwebtoken_1.default.verify(token, user_1.SECRET_KEY);
        console.log(verifyUser);
        const data = yield user_1.UserModel.findOne({ _id: verifyUser._id });
        console.log(data.username);
        // req.token=token;
        // req.data=data;
        next();
    }
    catch (error) {
        // res.status(401).send(error);
        req.flash("error_messages", "Please Login to continue !");
        res.redirect("/login");
    }
});
exports.auth = auth;
