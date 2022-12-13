import express from "express";
const router = express.Router();
import { Request, Response } from "express";

import { UserModel, I_UserDocument } from "../model/user";
import { auth } from "./auth";
import { signup } from "../controller/signup";
import { login } from "../controller/login";

// import mongoose from 'mongoose';

router.get("/", (req: Request, res: Response) => {
  res.render("index");
});

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

router.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", auth, (req: Request, res: Response) => {
  // res.render("profile", {
  //   username: req.data.username,
  //   verified: req.data.isVerified,
  // });
  res.render("profile");
});

router.get("/logout", auth, async (req: Request, res: Response) => {
  try {
    // console.log(req.data);
    res.clearCookie("jwt");
    console.log("logout successfully");
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

export default router;
