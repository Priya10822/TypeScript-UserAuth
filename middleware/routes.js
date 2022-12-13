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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("./auth");
const signup_1 = require("../controller/signup");
const login_1 = require("../controller/login");
// import mongoose from 'mongoose';
router.get("/", (req, res) => {
    res.render("index");
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.post("/signup", signup_1.signup);
router.post("/login", login_1.login);
router.get("/profile", auth_1.auth, (req, res) => {
    // res.render("profile", {
    //   username: req.data.username,
    //   verified: req.data.isVerified,
    // });
    res.render("profile");
});
router.get("/logout", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.data);
        res.clearCookie("jwt");
        console.log("logout successfully");
        res.render("login");
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.get("/login", (req, res) => {
    res.render("login");
});
exports.default = router;
