import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { UserModel, I_UserDocument } from "../model/user";
import bcryptjs from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  console.log("Email or Password", email, password);

  const useremail: I_UserDocument = (await UserModel.findOne({
    email: email,
  })) as I_UserDocument;
  console.log("useremail", useremail);

  if (useremail) {
    const number = 3 * 24 * 60 * 60 * 1000;
    const token = useremail.generateAuthToken();
    res.cookie("jwt", token, {
      maxAge: number,
      httpOnly: true,
    });
  } else {
    res.status(404).json({
      message: "Username and password incorrect",
    });
  }

  bcryptjs.compare(
    password,
    useremail.password as string,
    (err: Error, match: boolean) => {
      if (err) throw err;
      if (match) {
        res.redirect("/profile");
      }
      if (!match) {
        res.status(400).json({
          message: "Invalid credentials",
        });
      }
    }
  );
};
